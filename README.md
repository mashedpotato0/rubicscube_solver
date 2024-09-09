# Rubik's Cube Solver

This project implements a Rubik's Cube solver in JavaScript. It provides a visual representation of a Rubik's Cube and includes functionality to scramble, reset, and automatically solve the cube.

## Features

- 3D representation of a Rubik's Cube
- Scramble the cube randomly
- Reset the cube to its solved state
- Automatic solving algorithm
- Manual rotation of cube faces
- Enter custom move sequences

## How to Use

1. Clone this repository to your local machine.
2. Open the HTML file in a web browser to view the Rubik's Cube interface.
3. Use the provided buttons to interact with the cube:
   - "Scramble" to randomly mix up the cube
   - "Reset" to return the cube to its solved state
   - "Solve" to automatically solve the cube
   - "Enter Sequence" to input a custom sequence of moves

## Cube Notation

The solver uses the following notation for cube moves:
for keybord entry
- 1: Front face clockwise
- 2: Back face clockwise
- 3: Left face clockwise
- 4: Right face clockwise
- 5: Top face clockwise
- 6: Bottom face clockwise

for sequence entry
- 1: Front face clockwise
- 2: Front face counterclockwise
- 3: Back face clockwise
- 4: Back face counterclockwise
- 5: Left face clockwise
- 6: Left face counterclockwise
- 7: Right face clockwise
- 8: Right face counterclockwise
- 9: Top face clockwise
- 10: Top face counterclockwise
- 11: Bottom face clockwise
- 12: Bottom face counterclockwise

## Implementation Details

The solver uses a layer-by-layer method to solve the cube:

1. Solve the white cross
2. Solve the white corners
3. Solve the middle layer edges
4. Solve the yellow cross
5. Solve the yellow corners
6. Permute the yellow edges

## Performance

The solver includes performance timing to measure how long it takes to solve the cube. This information is logged to the console when the solve function is called.

## Contributing

Contributions to improve the solver algorithm or add new features are welcome. Please feel free to submit a pull request or open an issue to discuss potential changes.

## License

[Include your chosen license here]
