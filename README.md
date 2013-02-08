# What

# jQuery.breakpoint()
Breakpoint is a jQuery plugin to create breakpoints for **elements** when **@media queries** is not enough.

## Problem
With **CSS @media queries** it is possible to create breakpoints for different viewport sizes. This makes it possible to create responsive websites that works with different screen sizes. 

But what if you want to create a widget for example, that is also responsive, and that widget do not know how big its container is?

	<style>
		.my-widget {
			width: 80%;
		}
	</style>
	</head>
	<body>
		<div id="my-widget" class="my-widget">
		</div>
	</body>

So we have a widget that *the end user* has set to a width of 80%. But **we, the widget creators** do not know that. We do not know if it is set to 20%, 40% or 100% of screen width. We can not use the @media to controll the width based on something that we do not know.

## This scripts solution
This scripts adds a way to **create breakpoints for an element**. You can have a breakpoint for when `.my-widget` has a width of 600px for example.

## A note
Note that this scripts is build on the thinking of **Mobile first** which means that the main layot in CSS should be for mobile. Then when the **viewport gets bigger** you change stuff. So this script **adds classes when viewport are bigger than breakpoint**. It is *now* not possible to change this.

# API
The easiest way to use `jQuery.breakpoint()` is this:


	// Add breakpoint for when element is larger than 400px
	$('#my-widget').breakpoint(400);


	// Add multiple breakpoints
	$('#my-widget').breakpoint(400, 600, 800);
	
	// Choose your class name for breakpoint
	$('#my-widget').breakpoint('large', 800);

	// Add your own classnames for breakpoints
	$('#my-widget').breakpoint({
		mobile: 0, 		// Adds the .mobile class when width is > 0
		tablet: 800,	// Adds the .tablet class when width > 800
		desktop: 1000	// Adds the .desktop class when width > 1000
	});

