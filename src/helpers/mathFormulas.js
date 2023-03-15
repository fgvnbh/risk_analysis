export function triangular(x,a,b,c) {
    switch (true) {
        case (x <= a || x >= c): {
            return 0;
        }
        case (x > a && x <= b) : {
            return (x-a)/(b-a);
        }
        case (x > b && x < c) : {
            return (c-x)/(c-b);
        }
    }
}

export function trapezoidal(x,a,b,c,d) {
    switch (true) {
        case (x <= a || x >= d): {
            return 0;
        }
        case (x >= a && x < b) : {
            return (x-a)/(b-a);
        }
        case (x >= b && x < c) : {
            return 1;
        }
        case (x >= c && x < d) : {
            return (d-x)/(d-c);
        }
    }
}

export function squaredZSpline(x,a,b) {
    switch (true) {
        case (x <= a): {
            return 1;
        }
        case (x > a && x <= (a+b)/2) : {
            return 1-2*Math.pow((x-a)/(b-a),2);
        }
        case (x > (a+b)/2 && x < b) : {
            return 2*Math.pow((b-x)/(b-a),2);
        }
        case (x >= b) : {
            return 0;
        }
    }
}

export function sLinear(x,a,b) {
    switch (true) {
        case (x <= a): {
            return 0;
        }
        case (x > a && x <= b) : {
            return (x-a)/(b-a);
        }
        case (x > b) : {
            return 1;
        }
    }
}

export const mathFuncs = {
    sLinear,
    squaredZSpline,
    trapezoidal,
    triangular
}

export const funcsInputLength = {
    sLinear:2,
    squaredZSpline:2,
    trapezoidal:4,
    triangular:3
}
