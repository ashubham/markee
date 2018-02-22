![](https://github.com/ashubham/markee/raw/master/assets/Markee.gif)

# Markee
[![Build Status](https://travis-ci.org/ashubham/markee.svg?branch=master)](https://travis-ci.org/ashubham/markee)
[![npm version](https://badge.fury.io/js/markee.svg)](https://badge.fury.io/js/markee)

- [Demo](https://codepen.io/ashubham/pen/yveGyq?editors=0110) 

## Features
- Pure Javascript (Uses No JQuery or Frameworks).
    - But can be used with any.
- Lightweight
- Typescript (Types included).
- Fully customizable using CSS.
- Works in Chrome, Safari, IE, Firefox.

## Simple usage
```html
<div id="container"></div>
```
```javascript
import Markee from 'markee';

let el = document.getElementById('input');
let markee = new Markee(el /* Target element */, {
	initialText: 'You can simply highlight, what you wish using these handles!',
	onMarked: (text, startIdx, endIdx) => {
        // Callback when some one changes the 
        // marked selection.
		console.log(text, startIdx, endIdx);
	}
});
```
## Options

```typescript
let markee = new Markee(el, {
    initialText: '',  // text to be made markeeable.
    startIdx: 0,      // Start of initial selection.
    endIdx: 1,        // End of initial selection.
    
    /* The callback which is called when a user changes the marked selection. */
    onMarked: (text: string,  // selected text.
        startIdx: number,     // index of the start.
        endIdx: number)       // index of the end.
    
    markerClass: 'marker',      // CSS class for drag handle.
    tokenClass: 'token',        // CSS class for text token.
    beginClass: 'begin',        // CSS class for the begin marker.
    endClass: 'end',            // CSS class for the end marker.
    selectedClass: 'selected',  // CSS class for the marked selection.
    draggedClass: 'dragged',    // CSS class for the drag handle when being dragged.
})
```