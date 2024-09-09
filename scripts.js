class RubiksCube {
    constructor() {
        this.faces = {
            front: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            back: [
                [9, 10, 11],
                [12, 13, 14],
                [15, 16, 17]
            ],
            left: [
                [18, 19, 20],
                [21, 22, 23],
                [24, 25, 26]
            ],
            right: [
                [27, 28, 29],
                [30, 31, 32],
                [33, 34, 35]
            ],
            top: [
                [36, 37, 38],
                [39, 40, 41],
                [42, 43, 44]
            ],
            bottom: [
                [45, 46, 47],
                [48, 49, 50],
                [51, 52, 53]
            ]
        };
        this.count = 0;
        

        this.updateFaceColors();
        this.addEventListeners();
    }

    flattenCube() {
        const flattenedArray = [];

        const addFaceToFlattenedArray = (faceArray) => {
            faceArray.forEach(row => {
                flattenedArray.push(...row);
            });
        };

        addFaceToFlattenedArray(this.faces.front);
        addFaceToFlattenedArray(this.faces.back);
        addFaceToFlattenedArray(this.faces.left);
        addFaceToFlattenedArray(this.faces.right);
        addFaceToFlattenedArray(this.faces.top);
        addFaceToFlattenedArray(this.faces.bottom);

        return flattenedArray;
    }

    updateFaceColors() {
        Object.keys(this.faces).forEach(face => {
            const faceDiv = document.querySelector(`.face-${face}`);
            faceDiv.innerHTML = '';
            this.faces[face].forEach((row, rowIndex) => {
                row.forEach((value, colIndex) => {
                    const cell = document.createElement('div');
                    const quotient = Math.floor(value / 9) + 1;
                    switch (quotient) {
                        case 1:
                            cell.style.backgroundColor = 'white';
                            break;
                        case 2:
                            cell.style.backgroundColor = 'yellow';
                            break;
                        case 4:
                            cell.style.backgroundColor = 'red';
                            break;
                        case 3:
                            cell.style.backgroundColor = 'orange';
                            break;
                        case 5:
                            cell.style.backgroundColor = 'blue';
                            break;
                        case 6:
                            cell.style.backgroundColor = 'green';
                            break;
                        default:
                            cell.style.backgroundColor = 'grey';
                            break;
                    }
                    cell.textContent = value;
                    faceDiv.appendChild(cell);
                });
            });
        });
    }
    
    rotateFaceOnState(state, face, clockwise = true) {
        const faceArray = state[face];
        const newFace = [];

        for (let i = 0; i < 3; i++) {
            newFace.push([]);
            for (let j = 0; j < 3; j++) {
                newFace[i].push(clockwise ? faceArray[2 - j][i] : faceArray[j][2 - i]);
            }
        }

        state[face] = newFace;

    }

    rotateFace(face, clockwise = true) {
        const faceArray = this.faces[face];
        const newFace = [];

        for (let i = 0; i < 3; i++) {
            newFace.push([]);
            for (let j = 0; j < 3; j++) {
                newFace[i].push(clockwise ? faceArray[2 - j][i] : faceArray[j][2 - i]);
            }
        }

        this.faces[face] = newFace;
        this.rotateAdjacentFaces(face, clockwise);
        this.updateFaceColors();
        this.count++;
        //const flattened = this.flattenCube();
        //console.log(flattened);
    }

    rotateAdjacentFaces(face, clockwise) {
        const adjacent = this.getAdjacentFaces(face);
        const edges = adjacent.map(([adjFace, edgeIdx]) => this.getEdge(this.faces[adjFace], edgeIdx));

        if (clockwise) {
            edges.unshift(edges.pop());
        } else {
            edges.push(edges.shift());
        }

        adjacent.forEach(([adjFace, edgeIdx], i) => {
            this.setEdge(this.faces[adjFace], edgeIdx, edges[i]);
        });
    }

    getAdjacentFaces(face) {
        const adjacencies = {
            front: [['top', 1], ['right', 3], ['bottom', 4], ['left', 6]],
            back: [['top', 4], ['left', 3], ['bottom', 1], ['right', 6]],
            left: [['top', 3], ['front', 3], ['bottom', 3], ['back', 6]],
            right: [['top', 2], ['back', 7], ['bottom', 2], ['front', 2]],
            top: [['back', 4], ['right', 4], ['front', 4], ['left', 4]],
            bottom: [['front', 1], ['right', 1], ['back', 1], ['left', 1]]
        };
        return adjacencies[face];
    }

    getEdge(face, edgeIdx) {
        switch (edgeIdx) {
            case 0:
                return [face[0][0], face[0][1], face[0][2]];
            case 1:
                return [face[2][0], face[2][1], face[2][2]];
            case 2:
                return [face[0][2], face[1][2], face[2][2]];
            case 3:
                return [face[0][0], face[1][0], face[2][0]];
            case 4:
                return [face[0][2], face[0][1], face[0][0]];
            case 5:
                return [face[2][2], face[2][1], face[2][0]];
            case 6:
                return [face[2][2], face[1][2], face[0][2]];
            case 7:
                return [face[2][0], face[1][0], face[0][0]];
        }
    }

    setEdge(face, edgeIdx, edge) {
        switch (edgeIdx) {
            case 0:
                [face[0][0], face[0][1], face[0][2]] = edge;
                break;
            case 1:
                [face[2][0], face[2][1], face[2][2]] = edge;
                break;
            case 2:
                [face[0][2], face[1][2], face[2][2]] = edge;
                break;
            case 3:
                [face[0][0], face[1][0], face[2][0]] = edge;
                break;
            case 4:
                [face[0][2], face[0][1], face[0][0]] = edge;
                break;
            case 5:
                [face[2][2], face[2][1], face[2][0]] = edge;
                break;
            case 6:
                [face[2][2], face[1][2], face[0][2]] = edge;
                break;
            case 7:
                [face[2][0], face[1][0], face[0][0]] = edge;
                break;
        }
    }

    scramble() {
        const moves = ['front', 'back', 'left', 'right', 'top', 'bottom'];
        for (let i = 0; i < 7; i++) {
            const move = moves[Math.floor(Math.random() * moves.length)];
            const clockwise = Math.random() > 0.5;
            this.rotateFace(move, clockwise);
        }
    }

    reset() {

        this.faces = {
            front: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            back: [
                [9, 10, 11],
                [12, 13, 14],
                [15, 16, 17]
            ],
            left: [
                [18, 19, 20],
                [21, 22, 23],
                [24, 25, 26]
            ],
            right: [
                [27, 28, 29],
                [30, 31, 32],
                [33, 34, 35]
            ],
            top: [
                [36, 37, 38],
                [39, 40, 41],
                [42, 43, 44]
            ],
            bottom: [
                [45, 46, 47],
                [48, 49, 50],
                [51, 52, 53]
            ]
        };
        this.count = 0;
        this.updateFaceColors();
    }
    addEventListeners() {
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let rotation = { x: 0, y: 0 };
        const cube = document.getElementById('cube');
        const sensitivity = 0.3; // Adjust this value to control rotation speed
    
        function updateRotation() {
            cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
        }
    
        document.addEventListener('mousedown', (event) => {
            isDragging = true;
            previousMousePosition = { x: event.clientX, y: event.clientY };
        });
    
        document.addEventListener('mousemove', (event) => {
            if (!isDragging) return;
    
            const currentPosition = { x: event.clientX, y: event.clientY };
            const deltaMove = {
                x: currentPosition.x - previousMousePosition.x,
                y: currentPosition.y - previousMousePosition.y
            };
    
            // Rotate around Y-axis for horizontal mouse movement
            rotation.y += deltaMove.x * sensitivity;
    
            // Rotate around X-axis for vertical mouse movement
            rotation.x -= deltaMove.y * sensitivity;
    
            // Normalize rotation angles
            rotation.x = rotation.x % 360;
            rotation.y = rotation.y % 360;
    
            previousMousePosition = currentPosition;
            requestAnimationFrame(updateRotation);
        });
    
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    
        document.addEventListener('contextmenu', (event) => event.preventDefault());
    

        document.addEventListener('keydown', (event) => {
            const key = event.key;
            const ctrlKey = event.ctrlKey;

            switch (key) {
                case '1':
                    ctrlKey ? this.rotateFace('front', false) : this.rotateFace('front', true);
                    break;
                case '2':
                    ctrlKey ? this.rotateFace('back', false) : this.rotateFace('back', true);
                    this.logshape();
                    break;
                case '3':
                    ctrlKey ? this.rotateFace('left', false) : this.rotateFace('left', true);
                    break;
                case '4':
                    ctrlKey ? this.rotateFace('right', false) : this.rotateFace('right', true);
                    break;
                case '5':
                    ctrlKey ? this.rotateFace('top', false) : this.rotateFace('top', true);
                    break;
                case '6':
                    ctrlKey ? this.rotateFace('bottom', false) : this.rotateFace('bottom', true);
                    break;
                default:
                    break;
            }
        });
        document.getElementById('scramble').addEventListener('click', () => this.scramble());
        document.getElementById('reset').addEventListener('click', () => this.reset());
        document.getElementById('solve').addEventListener('click', () => this.solve());
    }

    arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    getCrossElements(v) {
        let a = this.flattenCube();
        switch (v) {
            case 'white': return [a[1], a[3], a[5], a[7]];
            case 'yellow': return [a[10], a[12], a[16], a[14]];
            case 'orange': return [a[19], a[25], a[23], a[21]];
            case 'red': return [a[30], a[28], a[32], a[34]];
            case 'green': return [a[46], a[50], a[52], a[48]];
            case 'blue': return [a[43], a[39], a[37], a[41]];
            default: return [];
        }
    }

    checkcrosses(cross) {
        return cross.some(x => x < 8);
    }
    checkWhite(cross) {
        return cross.every(x => x < 8);
    }
    

    yellowpart() {
        let yellowcross = this.getCrossElements('yellow');
        while (this.checkcrosses(yellowcross)) {
            if (yellowcross[0] === 1) { 
                this.rotateFace('top', true);
                this.rotateFace('top', true);
            } else if (yellowcross[3] === 3) { 
                this.rotateFace('left', true); 
                this.rotateFace('left', true);
            } else if (yellowcross[1] === 5) {
                this.rotateFace('right', true);
                this.rotateFace('right', true);
            } else if (yellowcross[2] === 7) {
                this.rotateFace('bottom', true);
                this.rotateFace('bottom', true);
            } else{
                this.rotateFace('back', false);
            } 
            yellowcross = this.getCrossElements('yellow');  
        }
    }
    
    orangepart() {
        let orangecross = this.getCrossElements('orange');
        while (this.checkcrosses(orangecross)) {
            if (orangecross[1] === 3) {
                this.rotateFace('front', false);
                this.rotateFace('bottom', true);
                this.rotateFace('front', true);
                this.yellowpart();
                this.redpart();
            } else if (orangecross[0] === 1) {
                this.rotateFace('top', true);
                this.yellowpart();
                this.redpart();
            } else if (orangecross[1] === 5) {
                this.rotateFace('front', true);
                this.rotateFace('bottom', true);
                this.rotateFace('front', false);
                this.yellowpart();
                this.redpart();
            } else if (orangecross[1] === 7) {
                this.rotateFace('bottom', true);
                this.yellowpart();
                this.redpart();
            } else{
                this.rotateFace('left', false);
            }
            orangecross = this.getCrossElements('orange');
        }
    }
    
    redpart() {
        let redcross = this.getCrossElements('red');
        while (this.checkcrosses(redcross)) {
            if (redcross[1] === 1) {
                this.rotateFace('top', true);
                this.yellowpart();
                this.orangepart();
            } else if (redcross[1] === 3) { 
                this.rotateFace('front', true);
                this.rotateFace('top', true);
                this.rotateFace('front', false);
                this.yellowpart();
                this.orangepart();
            } else if (redcross[1] === 5) {
                this.rotateFace('front', false);
                this.rotateFace('top', true);
                this.rotateFace('front', true);
                this.yellowpart();
                this.orangepart();
            } else if (redcross[3] === 7) { 
                this.rotateFace('bottom', false);
                this.yellowpart();
                this.orangepart();
            } else{
                this.rotateFace('right', true);
            }
            redcross = this.getCrossElements('red'); 
        }
    }
    
    greenpart() {
        let greencross = this.getCrossElements('green');
        while (this.checkcrosses(greencross)) {
            if (greencross[1] === 1) {
                this.rotateFace('front', true);
                this.rotateFace('right', false);
                this.rotateFace('front', false);
                this.yellowpart();
                this.bluepart();
            } else if (greencross[3] === 3) {
                this.rotateFace('left', false);
                this.yellowpart();
                this.bluepart();
            } else if (greencross[1] === 5) {
                this.rotateFace('right', false);
                this.yellowpart();
                this.bluepart();
            } else if (greencross[1] === 7) {
                this.rotateFace('front', false);
                this.rotateFace('right', false);
                this.rotateFace('front', true);
                this.yellowpart();
                this.bluepart();
            } else{
                this.rotateFace('bottom', true);
            }
            greencross = this.getCrossElements('green');
            
        }
    }
    
    bluepart() {
        let bluecross = this.getCrossElements('blue');
        while (this.checkcrosses(bluecross)) {
            if (bluecross[1] === 1) {
                this.rotateFace('front', false);
                this.rotateFace('left', true);
                this.rotateFace('front', true);
                this.yellowpart();
                this.greenpart();
            } else if (bluecross[1] === 3) {
                this.rotateFace('left', true);
                this.yellowpart();
                this.greenpart();
            } else if (bluecross[3] === 5) { 
                this.rotateFace('right', false);
                this.yellowpart();
                this.greenpart();
            } else if (bluecross[1] === 7) { 
                this.rotateFace('front', true);
                this.rotateFace('left', true);
                this.rotateFace('front', false); 
                this.yellowpart();
                this.greenpart();
            } else{
                this.rotateFace('top', true);
            }
            bluecross = this.getCrossElements('blue');
        }
    }
    solvedflageWhite(cross) {
        const targetOrders = [
            [1, 3, 5, 7],
            [3, 7, 1, 5],
            [7, 5, 3, 1],
            [5, 1, 7, 3]
        ];
    
        for (let orderIndex = 0; orderIndex < 4; orderIndex++) {
            const targetOrder = targetOrders[orderIndex];
            let match = true;
            for (let i = 0; i < targetOrder.length; i++) {
                if (cross[i] !== targetOrder[i]) {
                    match = false;
                    break;
                }
            }
    
            if (match) {
                return [match, 4];
            }
        }
        for (let i = 0; i < targetOrders[0].length; i++) {
            if (cross[i] !== targetOrders[0][i]) {
                return [true, i]; 
            }
        }
    
        return [false, 5];
    }
    
    
    whitepart(){
        let cross = this.getCrossElements('white');
        let a = this.solvedflageWhite(cross)
        if (this.checkWhite(cross) && a[0] === true) {
            switch (a[1]) {
                case 0:
                    this.rotateFace('top', true);
                    this.rotateFace('top', true);
                case 1:
                    this.rotateFace('left', false);
                    this.rotateFace('left', false);
                case 2:
                    this.rotateFace('right', true);
                    this.rotateFace('right', true);
                case 3:
                    this.rotateFace('bottom', false);
                    this.rotateFace('bottom', false);
                case 4: 
                    this.rotateFace('front', false);
            }
        }
    }
    
    whitecrossflag(cross) {
        return !(cross[0] === 1 && cross[1] === 3 && cross[2] === 5 && cross[3] === 7);
    }
    
    solveWhiteCross() {
        let whitecross = this.getCrossElements('white');
        let loopcount = 0;
        
        while (this.whitecrossflag(whitecross) && loopcount <= 100) {
            this.whitepart();
            this.yellowpart();
            this.orangepart();
            this.greenpart();
            this.redpart();
            this.bluepart();           
            whitecross = this.getCrossElements('white');
            loopcount++;
        }
    }
    checkCorner(cross) {
        const validValues = [0, 2, 6, 8];
        return cross.some(x => validValues.includes(x));
    }
    
    
    getCornerElements(v) {
        let a = this.flattenCube();
        switch (v) {
            case 'white': return [a[0], a[2], a[6], a[8]];
            case 'yellow': return [a[9], a[11], a[15], a[17]];
            case 'corner3': return [a[18], a[36], a[38], a[29],a[24], a[51], a[35], a[53]];
            case 'corner1': return [a[42],a[44],a[27], a[33],a[20],a[26],a[45],a[47]];
            case 'middle' : return [a[10], a[12], a[14], a[16] ];
            case 'middle2': return [a[19],a[28],a[41],a[50],a[39],a[48],a[25],a[34]]
            case 'middle3': return [a[10], a[14], a[16], a[12]];
            case 'red': return [a[27], a[29], a[33], a[35]];
            case 'green': return [a[45], a[47], a[51], a[53]];
            case 'blue': return [a[36], a[38], a[42], a[44]];
            case 'yellow1': return [a[9],a[10],a[11],
                                        a[12],a[13],a[14],
                                        a[15],a[16],a[17]]
            default: return [];
        }
    }
    
    yellowCorner() {
        let yellowCross = this.getCornerElements('yellow');
        while (this.checkCorner(yellowCross)) {
            if (yellowCross[0] < 9) { 
                this.enterSequence('3 9 3 3 10');
                this.solvecornerlayer3();
                yellowCross = this.getCornerElements('yellow');
            } else {
                this.rotateFace('back', false);
            }
            yellowCross = this.getCornerElements('yellow');
        }
    }
    solvecornerlayer3() {
        const sequences = [
            { indices: [0], value: 0, seq: '10 5 9 6' },
            { indices: [1], value: 0, seq: '5 10 6 9' },
            { indices: [2], value: 2, seq: '8 9 7 10' },
            { indices: [3], value: 2, seq: '9 8 10 7' },
            { indices: [4], value: 6, seq: '11 6 12 5' },
            { indices: [5], value: 6, seq: '6 11 5 12' },
            { indices: [6], value: 8, seq: '12 7 11 8' },
            { indices: [7], value: 8, seq: '7 12 8 11' },
        ];
    
        let cornerlayer3 = this.getCornerElements('corner3');
        while (this.checkCorner(cornerlayer3)) {
            const seq = sequences.find(s => 
                s.indices.every(index => cornerlayer3[index] === s.value)
            );
    
            if (seq) {
                this.enterSequence(seq.seq);
            } else {
                this.rotateFace('back', false);
            }
    
            cornerlayer3 = this.getCornerElements('corner3');
        }
    }
    solvecornerlayer1() {
        const sequences = [
            { indices: [0], value: 9, seq: '9 3 10' },
            { indices: [1], value: 9, seq: '10 4 9' },
            { indices: [2], value: 9, seq: '7 3 8' },
            { indices: [3], value: 9, seq: '8 4 7' },
            { indices: [4], value: 9, seq: '6 4 5' },
            { indices: [5], value: 9, seq: '5 3 6' },
            { indices: [6], value: 9, seq: '12 4 11' },
            { indices: [7], value: 9, seq: '11 3 12' },
        ];
    
        let cornerlayer3 = this.getCornerElements('corner1');
        while (this.checkCorner(cornerlayer3)) {
            const seq = sequences.find(s => 
                s.indices.every(index => cornerlayer3[index] < s.value)
            );
    
            if (seq) {
                this.enterSequence(seq.seq);
                this.solvecornerlayer3();
                cornerlayer3 = this.getCornerElements('corner1');
            } else {
                this.rotateFace('back', false);
            }
    
            cornerlayer3 = this.getCornerElements('corner1');
        }
    }

    solveWhiteCorners() {
        let whiteCorner = this.getCornerElements('white');
        let loopCount = 0;
        this.solvecornerlayer3();
        this.solvecornerlayer1();
        this.yellowCorner();
    }
    
    whiteCornerFlag(cross) {
        return !(cross[0] === 0 && cross[1] === 2 && cross[2] === 6 && cross[3] === 8);
    }

    checkmiddle(cross) {
        const validValues = [19, 28, 41, 50, 39, 48, 25, 34];
        return cross.some(value => validValues.includes(value));
    }

    checkreverse(cross) {
        const validValues = [19, 28, 41, 50, 39, 48, 25, 34];
        
        for (let i = 0; i < cross.length; i++) {
            if (cross[i] !== validValues[i]) {
                return i;
            }
        }
        return -1;
    }
    solveinverse() {
        let middlelayer = this.getCornerElements('middle2');
        let i = this.checkreverse(middlelayer);
        const seq = [
            '4 6 3 5 10 5 9 6', '3 7 4 8 9 8 10 7',
            '4 10 3 9 8 9 7 10', '3 11 4 12 7 12 8 11',
            '3 9 4 10 5 10 6 9', '4 12 3 11 6 11 5 12',
            '3 5 4 6 11 6 12 5', '4 8 3 7 12 7 11 8'
        ];
        while (i !== -1) {
            this.enterSequence(seq[i]);
            this.solvecornerlayer2();
            middlelayer = this.getCornerElements('middle2');
            i = this.checkreverse(middlelayer);
        }
    }
    
    
    solvecornerlayer2() {
        const sequences = [
            { indices: [0], values: [19, 28], seq: ['4 6 3 5 10 5 9 6', '3 7 4 8 9 8 10 7'] },
            { indices: [1], values: [41, 50], seq: ['4 10 3 9 8 9 7 10', '3 11 4 12 7 12 8 11'] },
            { indices: [2], values: [39, 48], seq: ['3 9 4 10 5 10 6 9', '4 12 3 11 6 11 5 12'] },
            { indices: [3], values: [25, 34], seq: ['3 5 4 6 11 6 12 5', '4 8 3 7 12 7 11 8'] },
        ];
    
        let cornerlayer2 = this.getCornerElements('middle');
        while (this.checkmiddle(cornerlayer2)) {
            let matched = false;
    
            for (const s of sequences) {
                const index = s.indices[0];  // index in cornerlayer2 to check
                const valueIndex = s.values.findIndex(val => cornerlayer2[index] === val);
                if (valueIndex !== -1) {
                    this.enterSequence(s.seq[valueIndex]);
                    matched = true;
                    break;
                }
            }
    
            if (!matched) {
                this.rotateFace('back', false);
            }
    
            cornerlayer2 = this.getCornerElements('middle');  // update the cornerlayer2 after every iteration
        }
    }
    
    

    solveMiddleLayerEdges() {
        this.solvecornerlayer2();
        this.solveinverse();
    }

    isY(num) {
        return Math.floor(num / 9) === 1;
    }
    
    yellowShape(arr) {
        let a = arr.map(num => this.isY(num));
        
        let flagL1 = (a[1] && a[3]);
        let flagL2 = (a[1] && a[5]);
        let flagL3 = (a[3] && a[7]);
        let flagL4 = (a[5] && a[7]);
        
        let flag_1 = (a[1] && a[7]);
        let flag_2 = (a[3] && a[5]);
        
        let flagP = (a[1] && a[3]) && (a[7] && a[5]);
        //let flagFull = a[0] && a[1] && a[2] && a[3] && a[4] && a[5] && a[6] && a[7] && a[8];
        //let flagF1 = flagP && a[0];
        //let flagF2 = flagP && a[2];
        //let flagF3 = flagP && a[6];
        //let flagF4 = flagP && a[8];
        if (flagP) {
            return ['fish', 5];
        }

        if (flag_1) {
            return ['-', 1];
        } else if (flag_2) {
            return ['-', 2];
        }
        if (flagL1) {
            return ['L', 1];
        } else if (flagL2) {
            return ['L', 2];
        } else if (flagL3) {
            return ['L', 3];
        } else if (flagL4) {
            return ['L', 4];
        }
        if (!flagP) {
            return ['dot', 1];
        }
        return ['', -1];
    }
    
    
    solveYellowCross() {
        let seq = ['11 5 3 6 4 12', '5 3 6 3 5 3 3 6'];
        let arr = this.getCornerElements('yellow1');
        let shape = this.yellowShape(arr);
    

        while (shape[0] !== 'fish') {
            if (shape[0] === 'dot') {
                this.enterSequence(seq[0]);
            } else if (shape[0] === 'L') {
                switch (shape[1]) {
                    case 1:
                        this.enterSequence(seq[0]);
                    case 2:
                        this.enterSequence('4');
                        this.enterSequence(seq[0]);
                    case 3:
                        this.enterSequence('3');
                        this.enterSequence(seq[0]);
                    case 4:
                        this.enterSequence('4 4');
                        this.enterSequence(seq[0]);
                }
            } else if (shape[0] === '-') {
                if (shape[1] === 1) {
                    this.enterSequence('3');
                    this.enterSequence(seq[0]);
                } else if (shape[1] === 2) {
                    this.enterSequence(seq[0]);
                }
            }
            arr = this.getCornerElements('yellow1');
            shape = this.yellowShape(arr);
        }
    }
    
    logshape(){
        let arr = this.getCornerElements('yellow1');
        let shape = this.yellowShape(arr);
        console.log("Detected Shape:", shape);
    }
    
    isSorted(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== i + 1) {
                return false;
            }
        }
        return true;
    }

    getCircularIndex(index) {
        return (index + 4) % 4;
    }

    swapNeighbors(index1, index2, arr) {
        const seq = ['5 3 6 3 5 4 4 6 3'];
        const [minIndex, maxIndex] = [index1, index2].sort((a, b) => a - b);
    
        if (minIndex === 0 && maxIndex === 1) {
            this.enterSequence('4 4');
            this.enterSequence(seq[0]);
            this.enterSequence('4 4');
            [arr[minIndex], arr[maxIndex]] = [arr[maxIndex], arr[minIndex]];
            console.log(arr);
        } else if (minIndex === 1 && maxIndex === 2) {
            this.enterSequence('3');
            this.enterSequence(seq[0]);
            this.enterSequence('4');
            [arr[minIndex], arr[maxIndex]] = [arr[maxIndex], arr[minIndex]];
            console.log(arr);
        } else if (minIndex === 2 && maxIndex === 3) {
            this.enterSequence(seq[0]);
            [arr[minIndex], arr[maxIndex]] = [arr[maxIndex], arr[minIndex]];
            console.log(arr);
        } else if (minIndex === 0 && maxIndex === 3) {
            this.enterSequence('4');
            this.enterSequence(seq[0]);
            this.enterSequence('3');
            [arr[minIndex], arr[maxIndex]] = [arr[maxIndex], arr[minIndex]];
            console.log(arr);
        }
    
        return arr;
    }
    
    

    sortyellow(arr) {
        const maxIterations = 4 * 4 * 2;
        let iterations = 0;
    
        while (!this.isSorted(arr) && iterations < maxIterations) {
            let swapped = false;
            for (let i = 0; i < arr.length; i++) {
                let currentValue = i + 1;
                if (arr[i] !== currentValue) {
                    let prevIndex = this.getCircularIndex(i - 1);
                    let nextIndex = this.getCircularIndex(i + 1);
                    
                    if (arr[prevIndex] === currentValue) {
                        console.log(`Swapping ${arr[i]} and ${arr[prevIndex]}`);
                        arr = this.swapNeighbors(i, prevIndex, arr);
                        swapped = true;
                    } else if (arr[nextIndex] === currentValue) {
                        console.log(`Swapping ${arr[i]} and ${arr[nextIndex]}`);
                        arr = this.swapNeighbors(i, nextIndex, arr);
                        swapped = true;
                    } else {
                        let prevPrevIndex = this.getCircularIndex(i - 2);
                        let nextNextIndex = this.getCircularIndex(i + 2);
                        
                        if (arr[prevPrevIndex] === currentValue) {
                            console.log(`Swapping ${arr[prevPrevIndex]}, ${arr[prevIndex]}, and ${arr[i]}`);
                            arr = this.swapNeighbors(prevPrevIndex, prevIndex, arr);
                            arr = this.swapNeighbors(prevIndex, i, arr);
                            swapped = true;
                        } else if (arr[nextNextIndex] === currentValue) {
                            console.log(`Swapping ${arr[i]}, ${arr[nextIndex]}, and ${arr[nextNextIndex]}`);
                            arr = this.swapNeighbors(nextNextIndex, nextIndex, arr);
                            arr = this.swapNeighbors(nextIndex, i, arr);
                            swapped = true;
                        }
                    }
                }
                if (swapped) break;
            }
            if (!swapped) break;
            iterations++;
        }
    
        return arr;
    }
    
    getarr() {
        let arr = this.getCornerElements('middle3');
        const replacements = {
            10: 1,
            14: 2,
            16: 3,
            12: 4
        };
        arr = arr.map(value => replacements[value] !== undefined ? replacements[value] : value);
        return arr;
    }
    
    permuteYellowCorners() {
        let arr = this.getarr();
        console.log('Initial Array:', arr);
        arr = this.sortyellow(arr);
        console.log('Sorted Array:', arr);   
    }

    getCorner(){
        let a = this.flattenCube();
        return [a[9], a[11],a[15], a[17]]; 
    }

    getflag(){
        let a = this.getCorner().map(num => this.isY(num));
        let flagF1 = a[0] && !a[1] && !a[2] && !a[3]; // 0
        let flagF2 = a[1] && !a[0] && !a[2] && !a[3]; // 1
        let flagF3 = a[2] && !a[1] && !a[0] && !a[3]; // 2
        let flagF4 = a[3] && !a[1] && !a[2] && !a[0]; // 3

        let flagOpp1 = (a[0] && a[3]) && !(a[1] && a[2]); // 4
        let flagOpp2 = (a[1] && a[2]) && !(a[0] && a[3]); // 5
        
        let flagAdj1 = (a[0] && a[1]) && !(a[1] && a[3]) && !(a[2] && a[3]) && !(a[0] && a[2]); // 6
        let flagAdj2 = !(a[0] && a[1]) && (a[1] && a[3]) && !(a[2] && a[3]) && !(a[0] && a[2]); // 7
        let flagAdj3 = !(a[0] && a[1]) && !(a[1] && a[3]) && (a[2] && a[3]) && !(a[0] && a[2]); // 8 
        let flagAdj4 = !(a[0] && a[1]) && !(a[1] && a[3]) && !(a[2] && a[3]) && (a[0] && a[2]); // 9

        let flagFull = a[0] && a[1] && a[2] && a[3]; // 10
        let flagNill = !flagFull; // 11

        if (flagF1){return 0;}else if (flagF2){return 1;}else if (flagF3){return 2;}else if (flagF4){return 3;}else if (flagOpp1){return 4;}else if (flagOpp2){return 5;}else if (flagAdj1){return 6;}else if (flagAdj2){return 7;}else if (flagAdj3){return 8;}else if (flagAdj4){return 9;}else if (flagFull){return 10;}else if (flagNill){return 11;}
    }
    solveYellowCorners(){
        let seq = '5 3 6 3 5 3 3 6';
        let flag  = this.getflag();
        while (flag !== 10){
            switch (flag){
                case 11:
                    this.enterSequence(seq);
                    flag  = this.getflag();
                    break;
                case 0:
                    this.enterSequence('4');
                    this.enterSequence(seq);
                    flag  = this.getflag();
                    break;
                case 1:
                    this.enterSequence('4 4');    
                    this.enterSequence(seq);
                    flag  = this.getflag();
                    break;
                case 2:
                    this.enterSequence(seq);
                    flag  = this.getflag();
                    break;
                case 3:
                    this.enterSequence('3');
                    this.enterSequence(seq);
                    flag  = this.getflag();
                    break;
                case 4:
                    this.enterSequence(seq);
                    flag  = this.getflag();
                    break;
                case 5:
                    this.enterSequence('3');
                    this.enterSequence(seq);
                    flag  = this.getflag();
                    break;
                case 6:
                    this.enterSequence(seq);
                    flag  = this.getflag();
                    break;
                case 7:
                    this.enterSequence('4');    
                    this.enterSequence(seq);
                    flag  = this.getflag();
                    break;
                case 8:
                    this.enterSequence('3 3');
                    this.enterSequence(seq);
                    flag  = this.getflag();
                    break;
                case 9:
                    this.enterSequence('3');
                    this.enterSequence(seq);
                    flag  = this.getflag(); 
                    break; 
            }
        }
 
    }
    getCorner1(){
        let a = this.flattenCube();
        return [a[51], a[53],a[35], a[29],a[38], a[36],a[18], a[24]]; 
    }
    isC(num) {
        return Math.floor(num / 9) ;
    }
    getflag1(){
        let a = this.getCorner1().map(num => this.isC(num));
        let flagF1 = (a[0] === a[1]) && !(a[2] === a[3]) && !(a[4] === a[5]) && !(a[6] === a[7]); // 0
        let flagF2 = !(a[0] === a[1]) && (a[2] === a[3]) && !(a[4] === a[5]) && !(a[6] === a[7]); // 1
        let flagF3 = !(a[0] === a[1]) && !(a[2] === a[3]) && (a[4] === a[5]) && !(a[6] === a[7]); // 2
        let flagF4 = !(a[0] === a[1]) && !(a[2] === a[3]) && !(a[4] === a[5]) && (a[6] === a[7]); // 3
        let flagF5 = (a[0] === a[1]) && (a[2] === a[3]) && (a[4] === a[5]) && (a[6] === a[7]);
        let flagF6 = !flagF5;

        if (flagF1){return 0;}
        else if (flagF2){return 1;}
        else if (flagF3){return 2;}
        else if (flagF4){return 3;}
        else if (flagF5){return 4;}
        else if (flagF6){return 5;}
    }
    permuteYellowEdges(){
        let seq = '6 11 6 9 9 5 12 6 9 9 5 5';
        let flag  = this.getflag1();
        //console.log(flag);
        while (flag !== 4){
            switch (flag){
                case 5:
                    this.enterSequence(seq);
                    flag  = this.getflag1();
                    //console.log(flag);
                    break;
                case 0:
                    this.enterSequence('4 4');
                    this.enterSequence(seq);
                    flag  = this.getflag1();
                    //console.log(flag);
                    break;
                case 1:
                    this.enterSequence('3');    
                    this.enterSequence(seq);
                    flag  = this.getflag1();
                    //console.log(flag);
                    break;
                case 2:
                    this.enterSequence(seq);
                    flag  = this.getflag1();
                    //console.log(flag);
                    break;
                case 3:
                    this.enterSequence('4');
                    this.enterSequence(seq);
                    flag  = this.getflag1();
                    //console.log(flag);
                    break;
            }
        }
 
    }

    getCorner2(){
        let a = this.flattenCube();
        return [a[51],a[52], a[53],a[35],a[32], a[29],a[38],a[37], a[36],a[18],a[21], a[24]]; 
    }
    checkL(){
        let a = this.flattenCube();
        return a[52] === a[35]; 
    }
    isC(num) {
        return Math.floor(num / 9) ;
    }
    getflag2(){
        let a = this.getCorner2().map(num => this.isC(num));
        let flagF1 = (a[0] === a[1]) && !(a[3] === a[4]) && !(a[6] === a[7]) && !(a[9] === a[10]); // 0
        let flagF2 = !(a[0] === a[1]) && (a[3] === a[4]) && !(a[6] === a[7]) && !(a[9] === a[10]); // 1
        let flagF3 = !(a[0] === a[1]) && !(a[3] === a[4]) && (a[6] === a[7]) && !(a[9] === a[10]); // 2
        let flagF4 = !(a[0] === a[1]) && !(a[3] === a[4]) && !(a[6] === a[7]) && (a[9] === a[10]);// 3
        let flagF5 = (a[0] === a[1]) && (a[3] === a[4]) && (a[6] === a[7]) && (a[9] === a[10]);
        let flagF6 = !flagF5;

        if (flagF1){return 0;}
        else if (flagF2){return 1;}
        else if (flagF3){return 2;}
        else if (flagF4){return 3;}
        else if (flagF5){return 4;}
        else if (flagF6){return 5;}
    }
    permuteYellowEdges1() {
        let seq = ['7 7 4 12 9 7 7 10 11 4 7 7', '7 7 4 12 9 7 7 10 11 4 7 7'];
        let flag = this.getflag2();
        //console.log(flag);
    
        const processSequence = (sequenceIndex) => {
            if (this.checkL) {
                this.enterSequence(seq[0]);
            } else {
                this.enterSequence(seq[sequenceIndex]);
            }
            flag = this.getflag2();
            //console.log(flag);
        };
    
        while (flag !== 4) {
            switch (flag) {
                case 5:
                    this.enterSequence(seq[0]);
                    flag = this.getflag2();
                    console.log(flag);
                    break;
                case 0:
                    this.enterSequence('4');
                    processSequence(1);
                    break;
                case 1:
                    this.enterSequence('3 3');
                    processSequence(1);
                    break;
                case 2:
                    this.enterSequence('3');
                    processSequence(1);
                    break;
                case 3:
                    processSequence(1);
                    break;
            }
        }
        
        const checky = () => {
            let a = this.flattenCube();
            return !((a[10] === 10) && (a[14] === 14) && (a[16] === 16) && (a[12] === 12));
        };
        while (checky()) {
            this.enterSequence('3');
        }
    }
    

    
    enterSequence(sequence) {
        const moves = sequence.split(' ');
        moves.forEach(move => {
            switch (move) {
                case '1':
                    this.rotateFace('front', true);
                    break;
                case '2':
                    this.rotateFace('front', false);
                    break;
                case '3':
                    this.rotateFace('back', true);
                    break;
                case '4':
                    this.rotateFace('back', false);
                    break;
                case '5':
                    this.rotateFace('left', true);
                    break;
                case '6':
                    this.rotateFace('left', false);
                    break;
                case '7':
                    this.rotateFace('right', true);
                    break;
                case '8':
                    this.rotateFace('right', false);
                    break;
                case '9':
                    this.rotateFace('top', true);
                    break;
                case '10':
                    this.rotateFace('top', false);
                    break;
                case '11':
                    this.rotateFace('bottom', true);
                    break;
                case '12':
                    this.rotateFace('bottom', false);
                    break;
                default:
                    console.error('Invalid move:', move);
            }
        });
    }
    

    solve() {
        console.time('solveTime');  // Start timing
    
        let a = this.count;
        this.solveWhiteCross();
        this.solveWhiteCorners();
        this.solveMiddleLayerEdges();
        this.solveYellowCross();
        // this.logshape();
        this.solveYellowCorners();
        // this.permuteYellowCorners();
        this.permuteYellowEdges();
        this.permuteYellowEdges1();
    
        let b = this.count;
        //console.log(b);
        this.updateFaceColors();
    
        console.timeEnd('solveTime');  // End timing and log the elapsed time
    }
    
}


document.addEventListener('DOMContentLoaded', () => {
    const cube = new RubiksCube();
    cube.updateFaceColors();
    
    document.getElementById('scramble').addEventListener('click', () => cube.scramble());
    document.getElementById('reset').addEventListener('click', () => cube.reset());
    document.getElementById('solve').addEventListener('click', () => cube.solve());
    document.getElementById('enter-sequence').addEventListener('click', () => {
        const sequence = prompt('Enter the sequence of moves');
        if (sequence) {
            cube.enterSequence(sequence);
        }
    });
});

