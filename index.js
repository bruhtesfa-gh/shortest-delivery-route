/**note Dijkstra's Algorithm dose not work for this case
becuase Dijkstra's Algorithm is basically find the shortest path from one point to the other
without touching all nodes
this coding challenge needs to touching all nodes once and also should return back to the
starting node I think this is the nucles of the challenge
**/

//this is Sample input of List of all Buildings and relative distance to each of other buildings
const buildings = {
  'Golagul': {
    'Haile': 3,
    'Arada': 2,
    'Federal Police': 4
  },
  'Haile': {
    'Golagul': 3,
    'Arada': 2,
    'Federal Police': 3
  },
  'Arada': {
    'Golagul': 2,
    'Haile': 2,
    'Federal Police': 2
  },
  'Federal Police': {
    'Golagul': 4,
    'Haile': 3,
    'Arada': 2
  }
}
//starting building name
const start = 'Haile';

/** 
 * functuion works based on permituation without repeataion and find all posible route
 * which are only starting and ending with a given building
 * @param buildings list of all buildings with thier name and retative distance to each of other building
 * @param start name of starting building name
 * @returns list of routes | Array 
 * 
**/
function FindAllPossiblePathStartWithStartingBuilding(buildings, start) {
  // possible route accumulater 
  let routes = [];
  /**the function find all permituation recursively
   * let b is 'ABCD' then
   * A + permituation(BCD) -> 
   * permituation(BCD) = B + permituation(CD) .....
  **/
  function recurse(current, remaining) {

    /**
     * recurtion stops if their is no remaining building 
     * also the if the new possible route starting point is the same as @start bilding arggument 
    **/
    if (remaining.length === 0 && current[0] === buildings[start]) {
      routes.push(current.concat(buildings[start]));
    } else {
      // loop through every remaining item 
      for (let i = 0; i < remaining.length; i++) {
        recurse(
          current.concat(remaining[i]),
          remaining.slice(0, i).concat(remaining.slice(i + 1))
        );
      }
    }
  }
  recurse([], buildings);
  return routes;
}

/**
 * calculate distance of a given path
 * @param buildings list of all buildings with thier name and retative distance to each of other building
 * @param route array of buildings name considered as path
 * @param distace default parameter initailized as 0 
 * @returns distance of path | Number
**/
function calculateDistance(buildings, route, distace = 0) {
  for (let i = 1; i < route.length; i++) {
    distace += buildings[route[i]][route[i - 1]];
  }
  return distace;
}

/**
 * for each of possible route compare each distance and 
 * select the first shorterst route
 * @param buildings list of all buildings with thier name and retative distance to each of other building
 * @param start name of starting building name
 * @returns shotest route | Array
 **/
function getOptimalRoute(buildings, start) {
  // set optimal distace as large as Infinity In order to compare any distance
  let optimalDistance = Number.POSITIVE_INFINITY;
  // Initialise Optimal distance
  let optimalRoute = [];
  //all bildings name
  const allBuilding = Object.keys(buildings);
  // get all possible route starting from the start building
  const allPossibleRoute = FindAllPossiblePathStartWithStartingBuilding(allBuilding, allBuilding.indexOf(start));
  //loop through all routes
  allPossibleRoute.forEach(route => {
    //check a given route distance is shorter than the optimal distance  
    if (calculateDistance(buildings, route) < optimalDistance) {
      optimalDistance = calculateDistance(buildings, route);
      //if we get shorter distance assign route as optimal route
      optimalRoute = route;
    }
  });
  return optimalRoute;
}
// run the function
console.log(getOptimalRoute(buildings, start))
