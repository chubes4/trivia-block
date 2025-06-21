<?php
/**
 * Plugin Name:       Trivia Block
 * Plugin URI:        https://chubes.net/trivia-block
 * Description:       A Gutenberg block for creating interactive trivia questions with real-time scoring across multiple questions on a page.
 * Version:           1.0.0
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Author:            Chris Huber
 * Author URI:        https://chubes.net
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       trivia-block
 * Domain Path:       /languages
 *
 * @package TriviaBlock
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define plugin constants
define( 'TRIVIA_BLOCK_VERSION', '1.0.0' );
define( 'TRIVIA_BLOCK_PLUGIN_FILE', __FILE__ );
define( 'TRIVIA_BLOCK_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'TRIVIA_BLOCK_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/**
 * Initialize the plugin
 */
function trivia_block_init() {
	// Load the main plugin class
	require_once TRIVIA_BLOCK_PLUGIN_DIR . 'includes/class-trivia-block-plugin.php';
	
	// Initialize the plugin
	$trivia_block = new Trivia_Block_Plugin();
	$trivia_block->init();
}
add_action( 'plugins_loaded', 'trivia_block_init' );

/**
 * Activation hook
 */
function trivia_block_activate() {
	// Flush rewrite rules on activation
	flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'trivia_block_activate' );

/**
 * Deactivation hook
 */
function trivia_block_deactivate() {
	// Clean up on deactivation
	flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'trivia_block_deactivate' );

/**
 * Uninstall hook
 */
function trivia_block_uninstall() {
	// Clean up plugin data on uninstall
	// Remove any options, transients, etc.
	delete_option( 'trivia_block_settings' );
}
register_uninstall_hook( __FILE__, 'trivia_block_uninstall' ); 