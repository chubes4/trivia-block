/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
	useBlockProps, 
	RichText,
	InspectorControls
} from '@wordpress/block-editor';
import { 
	PanelBody, 
	Button, 
	ToggleControl,
	Notice,
	TextControl,
	RangeControl
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { plus, trash } from '@wordpress/icons';
import { select, dispatch } from '@wordpress/data';

/**
 * The edit function describes the structure of your block in the context of the
 * Gutenberg editor. This represents what the editor will render when the block
 * is used.
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates block attributes.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const { question, options, correctAnswer, blockId, resultMessages, scoreRanges } = attributes;

	// Generate a unique block ID if one doesn't exist
	useEffect( () => {
		if ( ! blockId ) {
			setAttributes( { 
				blockId: `trivia_${ Date.now() }_${ Math.random().toString( 36 ).substr( 2, 9 ) }` 
			} );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: 'trivia-block-editor',
	} );

	// Update question
	const onChangeQuestion = ( newQuestion ) => {
		setAttributes( { question: newQuestion } );
	};

	// Update specific option
	const onChangeOption = ( index, newValue ) => {
		const newOptions = [ ...options ];
		newOptions[ index ] = newValue;
		setAttributes( { options: newOptions } );
	};

	// Add new option
	const addOption = () => {
		if ( options.length < 6 ) {
			setAttributes( { 
				options: [ ...options, '' ] 
			} );
		}
	};

	// Remove option
	const removeOption = ( index ) => {
		if ( options.length > 2 ) {
			const newOptions = options.filter( ( _, i ) => i !== index );
			setAttributes( { 
				options: newOptions,
				// Adjust correct answer if necessary
				correctAnswer: correctAnswer >= newOptions.length ? 0 : correctAnswer
			} );
		}
	};

	// Set correct answer
	const setCorrectAnswer = ( index ) => {
		setAttributes( { correctAnswer: index } );
	};

	// Sync result messages across all trivia blocks
	const syncResultMessagesAcrossBlocks = ( newMessages, newRanges ) => {
		const blocks = select( 'core/block-editor' ).getBlocks();
		const triviaBlocks = blocks.filter( block => block.name === 'trivia-block/trivia' );

		triviaBlocks.forEach( block => {
			if ( block.clientId !== clientId ) {
				dispatch( 'core/block-editor' ).updateBlockAttributes( block.clientId, {
					resultMessages: newMessages,
					scoreRanges: newRanges
				} );
			}
		} );
	};

	// Update result message
	const updateResultMessage = ( level, newMessage ) => {
		const newMessages = { ...resultMessages, [level]: newMessage };
		setAttributes( { resultMessages: newMessages } );
		syncResultMessagesAcrossBlocks( newMessages, scoreRanges );
	};

	// Update score range
	const updateScoreRange = ( level, newRange ) => {
		const newRanges = { ...scoreRanges, [level]: newRange };
		setAttributes( { scoreRanges: newRanges } );
		syncResultMessagesAcrossBlocks( resultMessages, newRanges );
	};

	// Validation
	const hasEmptyOptions = options.some( option => option.trim() === '' );
	const hasQuestion = question.trim() !== '';
	const isValid = hasQuestion && ! hasEmptyOptions;

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Trivia Settings', 'trivia-block' ) }>
					<p>
						{ __( 'Configure your trivia question options and select the correct answer.', 'trivia-block' ) }
					</p>
					
					{ ! isValid && (
						<Notice status="warning" isDismissible={ false }>
							{ ! hasQuestion && __( 'Please add a question.', 'trivia-block' ) }
							{ hasQuestion && hasEmptyOptions && __( 'Please fill in all answer options.', 'trivia-block' ) }
						</Notice>
					) }

					<div style={ { marginTop: '16px' } }>
						<strong>{ __( 'Answer Options:', 'trivia-block' ) }</strong>
						{ options.map( ( option, index ) => (
							<div key={ index } style={ { 
								marginTop: '8px',
								padding: '8px',
								border: correctAnswer === index ? '2px solid #00a32a' : '1px solid #ddd',
								borderRadius: '4px',
								backgroundColor: correctAnswer === index ? '#f0f9ff' : 'transparent'
							} }>
								<div style={ { display: 'flex', alignItems: 'center', gap: '8px' } }>
									<ToggleControl
										label={ correctAnswer === index ? __( 'Correct Answer', 'trivia-block' ) : __( 'Set as Correct', 'trivia-block' ) }
										checked={ correctAnswer === index }
										onChange={ () => setCorrectAnswer( index ) }
									/>
									{ options.length > 2 && (
										<Button
											icon={ trash }
											label={ __( 'Remove option', 'trivia-block' ) }
											onClick={ () => removeOption( index ) }
											isDestructive
											size="small"
										/>
									) }
								</div>
							</div>
						) ) }

						{ options.length < 6 && (
							<Button
								icon={ plus }
								onClick={ addOption }
								variant="secondary"
								size="small"
								style={ { marginTop: '8px' } }
							>
								{ __( 'Add Option', 'trivia-block' ) }
							</Button>
						) }
					</div>
				</PanelBody>

				<PanelBody title={ __( 'Result Messages (Applies to All Questions)', 'trivia-block' ) } initialOpen={ false }>
					<p style={ { fontSize: '13px', color: '#757575', marginBottom: '16px' } }>
						{ __( 'Customize the messages shown when users complete all trivia questions. Changes here apply to all trivia blocks on this page.', 'trivia-block' ) }
					</p>

					<div style={ { marginBottom: '20px' } }>
						<strong>{ __( 'Excellent Performance', 'trivia-block' ) }</strong>
						<RangeControl
							label={ __( `Score Range: ${scoreRanges.excellent}% and above`, 'trivia-block' ) }
							value={ scoreRanges.excellent }
							onChange={ ( value ) => updateScoreRange( 'excellent', value ) }
							min={ 80 }
							max={ 100 }
							step={ 5 }
						/>
						<TextControl
							label={ __( 'Message', 'trivia-block' ) }
							value={ resultMessages.excellent }
							onChange={ ( value ) => updateResultMessage( 'excellent', value ) }
							placeholder={ __( 'e.g., 🏆 Trivia Master!', 'trivia-block' ) }
						/>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<strong>{ __( 'Good Performance', 'trivia-block' ) }</strong>
						<RangeControl
							label={ __( `Score Range: ${scoreRanges.good}% - ${scoreRanges.excellent - 1}%`, 'trivia-block' ) }
							value={ scoreRanges.good }
							onChange={ ( value ) => updateScoreRange( 'good', value ) }
							min={ 60 }
							max={ scoreRanges.excellent - 5 }
							step={ 5 }
						/>
						<TextControl
							label={ __( 'Message', 'trivia-block' ) }
							value={ resultMessages.good }
							onChange={ ( value ) => updateResultMessage( 'good', value ) }
							placeholder={ __( 'e.g., 🎉 Great Job!', 'trivia-block' ) }
						/>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<strong>{ __( 'Okay Performance', 'trivia-block' ) }</strong>
						<RangeControl
							label={ __( `Score Range: ${scoreRanges.okay}% - ${scoreRanges.good - 1}%`, 'trivia-block' ) }
							value={ scoreRanges.okay }
							onChange={ ( value ) => updateScoreRange( 'okay', value ) }
							min={ 30 }
							max={ scoreRanges.good - 5 }
							step={ 5 }
						/>
						<TextControl
							label={ __( 'Message', 'trivia-block' ) }
							value={ resultMessages.okay }
							onChange={ ( value ) => updateResultMessage( 'okay', value ) }
							placeholder={ __( 'e.g., 👍 Not Bad!', 'trivia-block' ) }
						/>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<strong>{ __( 'Poor Performance', 'trivia-block' ) }</strong>
						<p style={ { fontSize: '13px', color: '#757575', margin: '4px 0 8px 0' } }>
							{ __( `Score Range: Below ${scoreRanges.okay}%`, 'trivia-block' ) }
						</p>
						<TextControl
							label={ __( 'Message', 'trivia-block' ) }
							value={ resultMessages.poor }
							onChange={ ( value ) => updateResultMessage( 'poor', value ) }
							placeholder={ __( 'e.g., 🤔 Keep Trying!', 'trivia-block' ) }
						/>
					</div>

					<Notice status="info" isDismissible={ false }>
						<strong>{ __( 'Examples for themed trivia:', 'trivia-block' ) }</strong><br />
						{ __( 'Festival Quiz: "Bonnaroo Veteran", "Music Lover", "Getting Started"', 'trivia-block' ) }<br />
						{ __( 'History Quiz: "History Scholar", "Well-Read", "Keep Learning"', 'trivia-block' ) }
					</Notice>
				</PanelBody>
			</InspectorControls>

			<div className="trivia-block-editor__content">
				<div className="trivia-block-editor__question">
					<RichText
						tagName="h3"
						value={ question }
						onChange={ onChangeQuestion }
						placeholder={ __( 'Enter your trivia question...', 'trivia-block' ) }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
						className="trivia-block-editor__question-input"
					/>
				</div>

				<div className="trivia-block-editor__options">
					{ options.map( ( option, index ) => (
						<div 
							key={ index } 
							className={ `trivia-block-editor__option ${ correctAnswer === index ? 'is-correct' : '' }` }
						>
							<div className="trivia-block-editor__option-content">
								<RichText
									tagName="div"
									value={ option }
									onChange={ ( value ) => onChangeOption( index, value ) }
									placeholder={ __( `Option ${ index + 1 }...`, 'trivia-block' ) }
									allowedFormats={ [] }
									className="trivia-block-editor__option-input"
								/>
								{ correctAnswer === index && (
									<span className="trivia-block-editor__correct-indicator">
										✓ { __( 'Correct Answer', 'trivia-block' ) }
									</span>
								) }
							</div>
						</div>
					) ) }
				</div>

				{ ! isValid && (
					<div className="trivia-block-editor__validation">
						<Notice status="warning" isDismissible={ false }>
							{ __( 'Complete the question and all options to preview how this will appear to users.', 'trivia-block' ) }
						</Notice>
					</div>
				) }

				{ isValid && (
					<div className="trivia-block-editor__preview">
						<p><em>{ __( 'Preview: This is how your trivia question will appear to users.', 'trivia-block' ) }</em></p>
					</div>
				) }
			</div>
		</div>
	);
} 