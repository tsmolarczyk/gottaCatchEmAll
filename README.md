# Gotta Catch 'Em All - Pokemon Search
This is a recruitment project that search Pokemon using PokeAPI.

## Technologies and libraries
- **Aurelia**: The main framework used for building the user interface.
- **Aurelia Router**: for managing views
- **RxJS**: Used for managing the state of the application.
- **LESS**: Used for styling the application’s components.
- **Lottie**: Used for displaying loading animations.

## Description
The "Gotta Catch 'em All Pokemon Search" project is an interactive web application consisting of two main views: 'Search' and 'Details'. The application allows users to search for Pokemon by name (both complete and partial) and by color. Upon selecting a Pokemon, the user is transitioned to the 'Details' view. During data loading, a loading animation is displayed. Detailed information about the selected Pokemon includes its name, statistics, and an image. This application provides a user-friendly interface for Pokemon enthusiasts to explore and learn more about their favorite creatures.

- Efficient Initial Loading: The application initially fetches a complete list of Pokemon and stores this data in localStorage for faster access on subsequent visits.
- State Management with BehaviorSubject: Uses BehaviorSubject to effectively manage and share application state across components.
- Alphabetical Display of Results: Search results are sorted alphabetically for easy navigation.
- Placeholder for Missing Images: If an image is not available in the API, a placeholder image is displayed for consistency.

## Screenshots
![image](https://github.com/tsmolarczyk/gottaCatchEmAll/assets/74697368/ea2b66ee-2a6a-43d5-8f2d-5a8d628630ee)
![image](https://github.com/tsmolarczyk/gottaCatchEmAll/assets/74697368/61a55487-8a0a-466f-9295-64e79d089667)
![image](https://github.com/tsmolarczyk/gottaCatchEmAll/assets/74697368/c8ccebf3-7fc3-4750-8961-9c536b46ab84)

## Live Demo
[Here](https://gotta-catch-em-1fbt5r7en-tsmolarczyk.vercel.app/) is a link to the live version of project.

## Source Code
The source code of the project is available [here](https://github.com/tsmolarczyk/gottaCatchEmAll).

## Installation and Running
To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/tsmolarczyk/gottaCatchEmAll.git`
2. Navigate to the project directory: `cd gottaCatchEmAll`
3. Install dependencies: `npm install`
4. Run the project: `npm run start`

The project should now be available at http://localhost:8080/.

## Contact
If you have any questions or suggestions, feel free to reach out to me!
