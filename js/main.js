const movieBundle =
    [
        {
            id: 1,
            name: "Netflix Bundle",
            image: " ./img/movie.jpg",
            slug: "netflix",
            movies: [
                {
                    id: 1,
                    name: "Hannibal"
                },
                {
                    id: 2,
                    name: "Money Heist"
                },
                {
                    id: 3,
                    name: "Barbey"
                },
            ]
        },
        {
            id: 2,
            name: "Binge Bundle",
            image: " ./img/movie.jpg",
            slug: "binge",
            movies: [
                {
                    id: 1,
                    name: "List 2"
                },
                {
                    id: 2,
                    name: "Money Heist"
                },
                {
                    id: 3,
                    name: "Barbey"
                },
            ]
        },
    ]

const seriesBundle = [
    {
        id: 1,
        name: "Friends",
        image: " ./img/series.jpg",
        slug: "friends",
        series: [
            {
                id: 1,
                name: "Friends"
            },
            {
                id: 2,
                name: "Money Heist"
            },
            {
                id: 3,
                name: "Barbey"
            },
        ]
    },
    {
        id: 2,
        name: "Death Note",
        image: " ./img/series.jpg",
        slug: "death_note",
        series: [
            {
                id: 1,
                name: "Death Note"
            },
            {
                id: 2,
                name: "Money Heist"
            },
            {
                id: 3,
                name: "Barbey"
            },
        ]
    },
]

const formData = {
    selectedSegments: [],
    selectedMovieType: "",
    selectedMovieBundle: "",
    selectedSeriesBundle: "",
}

let currentStep = "";

// Render selected segments badges
const renderSelectedSegments = () => {
    $("#selectedSegments").html("");
    formData.selectedSegments.map(item => {
        $("#selectedSegments").append(`
            <span>${item === "cineMovie" ? "Cine Movie" : "Cine Story"} <i class='bx bxs-x-circle text-lg -mt-1 removeSegmentBtn' data-target="${item}"></i></span>
        `);
    });
    let smt = formData.selectedMovieType;
    if (smt != "") {
        $("#selectedSegments").append(`
            <span class="pe-2">${smt === "cineMovie-movie" ? "Movie" : "Series"}</span>
        `);
    }

    let smb = formData.selectedMovieBundle;
    if (smb != "") {
        $("#selectedSegments").append(`
            <span class="pe-2">${smb}</span>
        `);
    }

    let ssb = formData.selectedSeriesBundle;
    if (ssb != "") {
        $("#selectedSegments").append(`
            <span class="pe-2">${ssb}</span>
        `);
    }

    if ($("#selectedSegments").html().trim() === "") {
        $("#selectedSegments").html(`<p class="text-red-600">No segment selected</p>`);
    }
    removeAction();
    step1BtnVisibility();
    step2NextBtnVisibility();
    step3NextBtnVisibility();
}

// Add segment
const addSegment = (category) => {
    formData.selectedSegments.push(category);
    // New Render
    renderSelectedSegments();
}

// Add Movie Type
const addMovieType = (type) => {
    formData.selectedMovieType = type;
    // New Render
    renderSelectedSegments();
}

// Add Movie Type
const addMovieBundle = (type) => {
    formData.selectedMovieBundle = type;
    // New Render
    renderSelectedSegments();
}

// Add Series Type
const addSeriesBundle = (type) => {
    formData.selectedSeriesBundle = type;
    // New Render
    renderSelectedSegments();
}

// Remove segment
const removeSegment = (category) => {
    const newForm = formData.selectedSegments.filter(item => item != category);
    formData.selectedSegments = newForm;
    console.log(formData);
    $(`.${category}`).removeClass("selected");
    if (category === "cineMovie") {
        formData.selectedMovieType = "";
        formData.selectedMovieBundle = "";
        formData.selectedSeriesBundle = "";
        removePrevSelectedMovieType();
        removePrevSelectedMovieBundle();
        removePrevSelectedSeriesBundle();
        if (currentStep === "FINISH" && formData.selectedSegments.length === 0) { 
            switchToStep1();    
        }
        else if (currentStep != "FINISH" && !formData.selectedSegments.includes(category)) switchToStep1();
        // else if (currentStep === "FINISH" && formData.selectedSegments.length === 0) switchToStep1();
    }
    else {
        if (currentStep === "FINISH" && formData.selectedSegments.length === 0) switchToStep1();
    }
    // New Render
    renderSelectedSegments();
}

const removePrevSelectedMovieType = () => {
    let step2 = document.querySelector(".step-2");
    if (step2.querySelector(".selected")) {
        step2.querySelector(".selected").classList.remove("selected");
    }
}

const removePrevSelectedMovieBundle = () => {
    let step3Movie = document.querySelector(".step-3-movies");
    if (step3Movie.querySelector(".selected")) {
        step3Movie.querySelector(".selected").classList.remove("selected");
    }
}

const removePrevSelectedSeriesBundle = () => {
    let step3Series = document.querySelector(".step-3-series");
    if (step3Series.querySelector(".selected")) {
        step3Series.querySelector(".selected").classList.remove("selected");
    }
}

// Remove Segment Action
const removeAction = () => {
    $(".removeSegmentBtn").each((ind, item) => {
        item.addEventListener("click", e => {
            let target = e.target.getAttribute("data-target");
            removeSegment(target);
        })
    });
    $(".removeMovieTypeBtn").click(e => {
        console.log("YAS");
    })
}

// Step 1 Next Button visibility
const step1BtnVisibility = () => {
    if (formData.selectedSegments.length > 0) {
        $("#step-1-next-btn").removeAttr("disabled");
        $("#step-1-next-btn").html(`Next <i class='bx bx-right-arrow-alt'></i>`);
    }
    else {
        $("#step-1-next-btn").attr("disabled", true);
        $("#step-1-next-btn").html(`Next <i class='bx bx-block'></i>`);
    }
}

// Step 2 Next Button visibility
const step2NextBtnVisibility = () => {
    if (formData.selectedMovieType != "") {
        $("#step-2-next-btn").removeAttr("disabled");
        $("#step-2-next-btn").html(`Next <i class='bx bx-right-arrow-alt'></i>`);
    }
    else {
        $("#step-2-next-btn").attr("disabled", true);
        $("#step-2-next-btn").html(`Next <i class='bx bx-block'></i>`);
    }
}

// Step 3 Next Button visibility
const step3NextBtnVisibility = () => {
    if (formData.selectedMovieBundle != "" || formData.selectedSeriesBundle != "") {
        $(".step-3-next-btn").each((ind, item) => {
            item.removeAttribute("disabled");
            item.innerHTML = `Next <i class='bx bx-right-arrow-alt'></i>`
        })
    }
    else {
        $(".step-3-next-btn").each((ind, item) => {
            item.setAttribute("disabled", true);
            item.innerHTML = `Next <i class='bx bx-block'>`
        })
    }
}

const switchToStep1 = () => {
    currentStep = "1nd"
    $("#step-header").html("Choose a segment");
    $(".step-1").addClass("active");
    $(".step-2").removeClass("active");
    $(".step-3-movies").removeClass("active");
    $(".step-3-series").removeClass("active");
    $(".step-4").removeClass("active");
}

const switchToStep2 = () => {
    currentStep = "2nd"
    $("#step-header").html("Choose a movie type");
    $(".step-2").addClass("active");
    $(".step-1").removeClass("active");
    $(".step-3-movies").removeClass("active");
    $(".step-3-series").removeClass("active");
}

const setupMovieDetailsView = (category) => {
    $("#movieListDetails").html("");

    const movie = movieBundle.find(item => item.slug === category);

    let content = `
        <div class="bg-slate-900 text-white p-4 rounded-md">
            <h3 class="text-xl font-semibold font-mono">${movie.name}</h3>
            <ul class="bundleList">
                `;

    movie.movies.map((item) => {
        content += `<li><i class='bx bxs-checkbox-checked'></i> ${item.name}</li>`;
    });

    content += `</ul></div>`;
    $("#movieListDetails").html(content);
}

const setupSeriesDetailsView = (category) => {
    $("#seriesListDetails").html("");

    const series = seriesBundle.find(item => item.slug === category);

    let content = `
        <div class="bg-slate-900 text-white p-4 rounded-md">
            <h3 class="text-xl font-semibold font-mono">${series.name}</h3>
            <ul class="bundleList">
                `;

    series.series.map((item) => {
        content += `<li><i class='bx bxs-checkbox-checked'></i> ${item.name}</li>`;
    });

    content += `</ul></div>`;
    $("#seriesListDetails").html(content);
}

const initializeMovieBundleListener = () => {
    // BundleCard
    formData.selectedSeriesBundle = "";
    $(".bundleCard").each((ind, item) => {
        item.addEventListener("click", () => {
            let category = item.getAttribute("data-bundle");

            if (!formData.selectedSegments.includes(category)) {
                setupMovieDetailsView(category);
                removePrevSelectedMovieBundle();
                addMovieBundle(category);
            }
            item.classList.toggle("selected");
        })
    })
}

const initializeSeriesBundleListener = () => {
    // BundleCard
    formData.selectedMovieBundle = "";
    $(".bundleCard").each((ind, item) => {
        item.addEventListener("click", () => {
            let category = item.getAttribute("data-bundle");
            if (!formData.selectedSegments.includes(category)) {
                setupSeriesDetailsView(category);
                removePrevSelectedSeriesBundle();
                addSeriesBundle(category);
            }
            item.classList.toggle("selected");
        })
    })
}

const renderMovieBundle = () => {
    $(".step-3-movies .stepsBody").html("");

    movieBundle.map(item => {
        $(".step-3-movies .stepsBody").append(`
            <div class="bundleCard ${formData.selectedMovieBundle === item.slug && "selected"}" data-bundle="${item.slug}">
                <div class="bundleImgBox">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="details w-fit mx-auto">
                    <h3 class="text-lg font-semibold">${item.name}</h3>
                </div>
            </div>     
        `);
    })
    initializeMovieBundleListener();
    renderSelectedSegments();
};

const renderSeriesBundle = () => {
    $(".step-3-series .stepsBody").html("");

    seriesBundle.map(item => {
        $(".step-3-series .stepsBody").append(`
            <div class="bundleCard ${formData.selectedSeriesBundle === item.slug && "selected"}" data-bundle="${item.slug}">
                <div class="bundleImgBox">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="details w-fit mx-auto">
                    <h3 class="text-lg font-semibold">${item.name}</h3>
                </div>
            </div>     
        `);
    })
    initializeSeriesBundleListener();
    renderSelectedSegments();
};

const switchToStep3Movies = () => {
    currentStep = "3rd"
    $("#step-header").html("Choose a movie bundle");
    $(".step-3-movies").addClass("active");
    $(".step-2").removeClass("active");
    $(".step-4").removeClass("active");
    renderMovieBundle();
}

const switchToStep3Series = () => {
    currentStep = "3rd"
    $("#step-header").html("Choose a series bundle");
    $(".step-3-series").addClass("active");
    $(".step-2").removeClass("active");
    $(".step-4").removeClass("active");
    renderSeriesBundle();
}

const switchToStep4 = () => {
    currentStep = "FINISH"
    $("#step-header").html("Almost There!");
    $(".step-4").addClass("active");
    $(".step-1").removeClass("active");
    $(".step-3-movies").removeClass("active");
    $(".step-3-series").removeClass("active");
    $(".step-1-series").removeClass("active");
}

const submitBtnVisibility = (num) => {
    let rex = /^(01[3-9]\d{8})$/;
    if (rex.test(num)) {
        $("#step-4-next-btn").removeAttr("disabled");
        $("#step-4-next-btn").html(`Submit <i class='bx bx-check'></i>`);
    }
    else {
        $("#step-4-next-btn").attr("disabled", true);
        $("#step-4-next-btn").html(`Submit <i class='bx bx-block'></i>`);
    }
};

$("document").ready(() => {
    $(".segment").each((ind, item) => {
        item.addEventListener("click", e => {
            item.classList.toggle("selected");
            let category = item.getAttribute("data-category");
            if (!formData.selectedSegments.includes(category)) addSegment(category);
            else removeSegment(category);
        })
    });

    // Step 1 Button Action
    $("#step-1-next-btn").click(e => {
        if (formData.selectedSegments.includes("cineMovie")) switchToStep2();
        else if (formData.selectedSegments.length > 0) switchToStep4();
    })
    // Step 2 Previous Button Action
    $("#step-2-prev-btn").click(e => switchToStep1());

    $(".step-3-prev-btn").each((ind, item) => {
        item.addEventListener("click", () => {
            switchToStep2();
        })
    })

    // Movie Cards
    $(".movie-card").each((ind, item) => {
        item.addEventListener("click", e => {
            let category = item.getAttribute("data-category");

            if (formData.selectedMovieType != category) {
                formData.selectedMovieBundle = "";
                formData.selectedSeriesBundle = "";
                removePrevSelectedMovieType();
                addMovieType(category);
            }
            item.classList.add("selected");
        });
    })

    // Step 2 Next Button Action
    $("#step-2-next-btn").click(e => {
        if (formData.selectedMovieType === "cineMovie-movie") switchToStep3Movies();
        else switchToStep3Series();
    });

    // Step 3 Next Button Action
    $(".step-3-next-btn").click(e => {
        switchToStep4();
    });

    // Step 4 Next Button Action
    $("#step-4-prev-btn").click(e => {
        if (formData.selectedSegments.includes("cineMovie")) {
            if (formData.selectedSeriesBundle != "") switchToStep3Series();
            else switchToStep3Movies();
        }
        else switchToStep1();
    });

    document.querySelector("#phone").addEventListener("input", e => {
        let num = e.target.value;
        submitBtnVisibility(num);
        let formData = new FormData();
        formData.append('key1', 'value1');
        formData.append('key2', 'value2');
    })

    $("#preferenceForm").submit(e => {
        e.preventDefault();

        $("#step-4-next-btn").attr("disabled", true);
        $("#step-4-next-btn").html(`Submitting <i class='bx bx-loader-alt animate-spin'></i>`);

        let newForm = new FormData();

        newForm.set('selection', formData);
        newForm.set('phone', $("#phone").val());

        for (var key of newForm.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }

    })

})
 