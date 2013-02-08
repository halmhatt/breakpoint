(function ($) {

	$.fn.breakpoint = function (a, b, c, d) {
		var classNamePrefix = 'min-width-',
			args = arguments,
		
			// Functions
			checkWidth,
			addBreakpointsArray,
			addBreakpointsObject,
			addBreakpoint,
			breakpointsString,
			sortBreakpoints,
			createStandardBreakpoint;
			
			
		checkWidth = function ($element) {
			return $element.width();
		};
		
		breakpointsString = function (breakpointsArr) {
			var i, len,
				str = breakpointsArr[0].name;
			
			for (i = 1, len = breakpointsArr.length; i < len; i += 1) {
				str += ' ' + breakpointsArr[i].name;
			}
			
			return str;
		};
		
		createStandardBreakpoint = function (breakpoint) {
			
			return {
				name: classNamePrefix + breakpoint,
				breakpoint: breakpoint
			};
		};
		
		/**
		 * Sorts the breakpoints in smallest -> largest breakpoint
		 */
		sortBreakpoints = function (a, b) {
			return a.breakpoint - b.breakpoint;
		};
		
		addBreakpointsArray = function (breakpointArr) {
			var i, len,
				breakpointsArr = [];
			
			// Figure out how array is built
			if (typeof breakpointArr[0] === 'string') {
				
				// classname, breakpoint
				for (i = 0, len = breakpointArr.length; i < len; i += 2) {
					breakpointsArr.push({
						name: breakpointArr[i],
						breakpoint: breakpointArr[i + 1]
					});
				}
			} else {
				if (typeof breakpointArr[1] === 'number') {
					
					// breakpoint, breakpoint
					for (i = 0, len = breakpointArr.length; i < len; i += 1) {
						breakpointsArr.push(
							createStandardBreakpoint(
								breakpointArr[i]
							)
						);
					}
				} else {
					
					// breakpoint, classname
					for (i = 0, len = breakpointArr.length; i < len; i += 2) {
						breakpointsArr.push({
							name: breakpointArr[i + 1],
							breakpoint: breakpointArr[i]
						});
					}
				}
			}
			
			addBreakpoints.call(this, breakpointsArr);
		};
		
		addBreakpointsObject = function (breakpointObject) {
			var breakpointsArr = [];
			
			// Create array
			for (className in breakpointObject) {
				if (breakpointObject.hasOwnProperty(className)) {
					breakpointsArr.push({
						name: className,
						breakpoint: breakpointObject[className]
					});
				}
			}
			
			addBreakpoints.call(this, breakpointsArr);
		};
		
		addBreakpoints = function (breakpointsArr) {
			var $this = $(this);
			
			// Sort array
			breakpointsArr.sort(sortBreakpoints);
			
			// Save on object
			$this.data('breakpoints', breakpointsArr);
			
			// Bind resize event
			$(window).bind('resize', function (e) {
				var i, len,
					breakpoints = $this.data('breakpoints'),
					breakpoint,
					allBreakpointsAsString = breakpointsString(breakpoints),
					width = checkWidth($this);
				
				// Loop through all classes
				for (i = 0, len = breakpoints.length; i < len ; i += 1) {
					breakpoint = breakpoints[i];
					
					// Remove all other breakpoint-classes
					$this.removeClass(allBreakpointsAsString);
					
					// Add class
					if (breakpoint.breakpoint <= width) {
					
						// Add new class
						$this.addClass(breakpoint.name);
					}
				}
			}).trigger('resize');
		};
		
		
		return this.each(function () {
		
			if (args.length === 1) { 
				// Check for type
				switch (typeof a) {
					case 'number':
						// Just add a breakpoint
						addBreakpoints.call(this, [
							createStandardBreakpoint(a)
						]);
						break;
						
					case 'object':
						// Check if array or object
						if (typeof Array.isArray === 'function') {
							if (Array.isArray(a)) {
								// It is an array
								addBreakpointsArray.call(this, a);
							} else {
								// It is an object
								addBreakpointsObject.call(this, a);
							}
						} else {
							// Check in another way
						}
						
						break;
						
					default:
						throw 'There is no support for a parementer of type: ' + (typeof a);
				}
			} else if (args.length >= 2) {
				// Check if 2 breakpoints or className / breakpoint
				// Check if className and breakpoint or only breakpoints
				
				if (typeof a === 'number' && typeof b === 'number') {
					// Array of numbers
					addBreakpointsArray.call(this, args);
				} else {
					// Number, classname OR classname, number
					addBreakpointsArray.call(this, args);
				}
			} else {
				// Return all breakpoints for this element
			}
			
			//$(this).trigger('resize');
		});
	};
})(jQuery);
