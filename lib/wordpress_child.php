<?php
	
	/*
		Call Custom Styles
	*/
	

	function galaxy_scriptss() 
	{
		
		wp_enqueue_style( 'galaxy-child-style', get_stylesheet_directory_uri() . '/style.css' );
	    wp_enqueue_style( 'galaxy-child-custom-style', get_stylesheet_directory_uri() . '/css/custom.min.css' );
	    wp_enqueue_script( 'galaxy-child-custom-js', get_stylesheet_directory_uri() . '/js/custom.min.js' );
	    
	}
	
	add_action( 'wp_enqueue_scripts', 'galaxy_scriptss', 99 );
	
?>