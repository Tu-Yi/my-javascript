/* number
console.log('%f  %f  %f  %f  %f',
Math.pow(2, 1024),
Math.pow(2, -1075),
Math.pow(2, -1076),
Number.MAX_VALUE,
Number.MIN_VALUE
);
*/

/* NaN
console.log('%f  %f  %f  %f  %f  %f  %f',
(5 - 'x'),
(Math.sqrt(-1)),
(0 / 0),
(typeof NaN),
(NaN === NaN),
(Boolean(NaN)),
(NaN + 32)
);
*/

/* Infinity
console.log('%f  %f  %f  %f  %f  %f',
Math.pow(2, 1024),
(0 / 0),
(1 / 0),
(Infinity === -Infinity),
(1 / -0),
(-1 / -0)
);
*/

/* parseint
console.log('%f  %f  %f  %f',
parseInt(1.223),
parseInt('123abc'),
parseInt({}),
parseInt([1,2,3])
);
*/

/* 判断nan
function myIsNaN(value) {
    return value !== value;
}
*/



