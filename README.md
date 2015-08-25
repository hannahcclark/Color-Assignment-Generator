# Color-Assignment-Generator
Node.js module that will generate vibrant, unique, and visibly different (as much as can reasonably be expected based on number of colors generated) RGB colors for as long as possible

## How to Get It
Run ```npm install color-assignment-generator```

Include the following in your file:
<br>```var myColorGenerator = require('color-assignment-generator')```

## How to Use It
To get new RGB color use the `getColor()` method. This will return an object with keys `r`, `g`, and `b`, whose values are the corresponding RGB values.

If you are worried about loosing your place in color assignment if/when your application stops running, call the `getSavedValues()` method. This method returns a dictionary that you may save in a persistant store. 

When your program resumes running, simply pass the saved object to the `setSavedValues(savedDict)` method. It is not advised to use this method to adjust settings manually, as values not generated with the algorithm and it's starting values can yield undefined behavior.

If you want to allow more or fewer colors before repitition of colors begins, use the `setMinimumDifference(newMin)`, passing a new number.
