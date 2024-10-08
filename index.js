var siteWidth = 1280;
var scale = screen.width / siteWidth;

document
  .querySelector('meta[name="viewport"]')
  .setAttribute(
    "content",
    "width=" + siteWidth + ", initial-scale=" + scale + ""
  );

// index.html
async function loadHtml(file, elementId) {
  await fetch(file)
    .then((response) => response.text())
    .then((data) => (document.getElementById(elementId).innerHTML = data))
    .catch((error) => console.error(`Error loading ${file}: ${error}`));
}

// instructions.html
document.addEventListener("DOMContentLoaded", async () => {
  await loadHtml("instructions.html", "main-content");

  // Load instructions

  // Load lift system form interaction
  const liftSystemForm = document.getElementById("lift-system-form");

  liftSystemForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const totalFloors = parseInt(
      document.getElementById("total-floors-input").value
    );
    const totalLifts = parseInt(
      document.getElementById("total-lifts-input").value
    );

    if (totalFloors === 0) {
      alert(
        "Number of floors must be greater than 1, as lifts are used for buildings with more than one floor."
      );
      return;
    }
    if (totalFloors === 1) {
      alert(
        "Number of floors should be more then 1, as lifts are used for buildings with more than one floor."
      );
      return;
    }

    const nonNumericPattern = /[^0-9]/;

    if (
      nonNumericPattern.test(totalFloors) ||
      nonNumericPattern.test(totalLifts)
    ) {
      alert("Invalid inputs. Please enter valid numbers only.");
      return;
    }

    if (totalFloors < 0) {
      alert("Total Floors must be greater then 1");
      return;
    }

    if (totalLifts < 0) {
      alert("Total Lift should be atleast 1");
      return;
    }

    if (totalLifts === 0) {
      alert("Total Lift should be atleast 1");
      return;
    }

    loadLiftSimulation(totalFloors, totalLifts);
  });
});

// lift-simulation.html
async function loadLiftSimulation(totalFloors, totalLifts) {
  await loadHtml("lift-simulation.html", "main-content");

  // Create building
  generateBuilding(totalFloors, totalLifts);

  // Initialize lift system
  new LiftSystem(totalFloors, totalLifts);
}

function generateBuilding(totalFloors, totalLifts) {
  const building = document.getElementById("building");
  building.innerHTML = "";

  for (let floor = totalFloors - 1; floor >= 0; floor--) {
    const floorDiv = document.createElement("div");
    floorDiv.className = "floor";

    // Floor number
    const floorNumberDiv = document.createElement("div");
    floorNumberDiv.className = "floor-number";
    if (floor === 0) {
      floorNumberDiv.innerHTML = `0`;
    } else if (floor === 1) {
      floorNumberDiv.innerHTML = `${floor}`;
    } else if (floor === 2) {
      floorNumberDiv.innerHTML = `${floor}`;
    } else if (floor === 3) {
      floorNumberDiv.innerHTML = `${floor}`;
    } else {
      floorNumberDiv.innerHTML = `${floor}`;
    }

    floorDiv.appendChild(floorNumberDiv);

    // Floor control system
    const floorControl = `
      <div class="floor-lift-control">
        ${
          floor !== totalFloors - 1
            ? ` <div class="floor-lift-control-up">
                  <div class="floor-lift-control-screen"></div>
                  <button class="floor-lift-control-button" data-floor=${floor} data-direction="up">UP</button>
                </div>`
            : ""
        }
        ${
          floor !== 0
            ? ` <div class="floor-lift-control-down">
                  <div class="floor-lift-control-screen"></div>
                  <button class="floor-lift-control-button" data-floor=${floor} data-direction="down">DOWN</button>
                </div>`
            : ""
        }
      </div>`;

    floorDiv.innerHTML += floorControl;

    // Floor lifts
    const floorLiftsDiv = document.createElement("div");
    floorLiftsDiv.className = "floor-lifts";

    for (let lift = 1; lift <= totalLifts; lift++) {
      const floorLiftDiv = document.createElement("div");
      floorLiftDiv.className = "floor-lift";
      if (floor === 0) {
        floorLiftDiv.innerHTML = `
        <div class="lift" id="lift-${lift}">
            <div class="lift-door-screen">
                <div class="lift-door-screen-up"></div>
                <div class="lift-door-screen-text"></div>
                <div class="lift-door-screen-down"></div>
            </div>
            <div class="lift-door">
                <div class="lift-door-left"></div>
                <div class="lift-door-right"></div>
            </div>
        </div>
        `;
      }
      floorLiftsDiv.appendChild(floorLiftDiv);
    }

    floorDiv.appendChild(floorLiftsDiv);

    // Append floor to building
    building.appendChild(floorDiv);
  }
}
