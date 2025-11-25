window.addEventListener("DOMContentLoaded", () => {
    const workers = JSON.parse(localStorage.getItem('workers')) ||
        [
            {
                id: 0,
                name: "Emma Fischer",
                role: "Receptionist",
                room: "reception",
                photo: "https://i.pravatar.cc/150?img=32",
                email: "emma.fischer@example.com",
                phone: "+44 7112 418 129",
                experiences: [
                    {
                        start: "2021-03-01",
                        end: "2023-07-15",
                        position: "Senior UX Designer",
                        company: "PixelForge Studio",
                        description: "Led redesigns for e-commerce platforms, improved user flows, and conducted A/B testing."
                    },
                    {
                        start: "2019-01-10",
                        end: "2020-11-30",
                        position: "Junior UX/UI Designer",
                        company: "NovaTech Solutions",
                        description: "Created wireframes, assisted in prototyping, and collaborated with front-end developers."
                    }
                ]
            },

            {
                id: 1,
                name: "Lucas Schneider",
                role: "Manager",
                room: "all",
                photo: "https://i.pravatar.cc/150?img=11",
                email: "lucas.schneider@example.com",
                phone: "+44 7412 428 139",
                experiences: [
                    {
                        start: "2020-06-01",
                        end: "2024-01-20",
                        position: "Front-End Developer",
                        company: "CloudShift Digital",
                        description: "Built responsive UIs using React, improved performance, and collaborated with UX designers."
                    }
                ]
            },

            {
                id: 2,
                name: "Clara Moreau",
                role: "Technician",
                room: "servers",
                photo: "https://i.pravatar.cc/150?img=47",
                email: "clara.moreau@example.com",
                phone: "+44 7092 748 124",
                experiences: [
                    {
                        start: "2022-02-10",
                        end: "2023-12-01",
                        position: "HR Assistant",
                        company: "Humanix Groupe",
                        description: "Handled recruitment, organized interviews, and maintained employee records."
                    }
                ]
            },

            {
                id: 3,
                name: "Nikolai Jensen",
                role: "janitor",
                room: "staff",
                photo: "https://i.pravatar.cc/150?img=22",
                email: "nikolai.jensen@example.com",
                phone: "+44 7312 498 111",
                experiences: [
                    {
                        start: "2021-01-01",
                        end: "2024-04-10",
                        position: "Backend Developer",
                        company: "ArcticSoft",
                        description: "Developed REST APIs, improved database performance, and integrated authentication systems."
                    },
                    {
                        start: "2018-05-12",
                        end: "2020-09-30",
                        position: "Junior Backend Engineer",
                        company: "NordByte",
                        description: "Worked on microservices, wrote unit tests, and assisted in server maintenance."
                    }
                ]
            },

            {
                id: 4,
                name: "Lara Craft",
                role: "Receptionist",
                room: "reception",
                photo: "https://i.pravatar.cc/150?img=5",
                email: "elena.rossi@example.com",
                phone: "+44 7372 710 126",
                experiences: [
                    {
                        start: "2019-04-01",
                        end: "2022-12-15",
                        position: "Marketing Specialist",
                        company: "VividMedia",
                        description: "Managed social campaigns, ran analytics, and improved brand visibility across platforms."
                    }
                ]
            }
        ];

    let assignedWorkers = []

    //this function loops over all the rooms and makes sure that it looks the way it's supposed to
    const roomCapacities = {
        'conference': 6,
        'servers': 2,
        'security': 2,
        'reception': 2,
        'staff': 2,
        'vault': 2
    };

    function check() {
        const map = document.getElementById('map');
        const rooms = document.querySelectorAll('.room');
        rooms.forEach(room => {
            const max = roomCapacities[room.id] || 1;
            if (room.classList.contains('important') && room.children.length < 2) {
                room.style.backgroundColor = 'rgba(238, 91, 91, 0.529)';
            }
            else {
                room.style.backgroundColor = '';
            }
            if (room.classList.contains('room') && room.children.length < max && !room.querySelector('.assigned_worker')) {
                room.insertAdjacentHTML('beforeend',
                    `<div class="flex flex-col md:flex-col -rotate-90 md:rotate-0 flex-wrap items-center justify-center md:items-center gap-3 md:w-full md:h-full md:mt-5 cont">
                        <div class="flex flex-wrap gap-3 h-26 w-16 md:h-max md:w-max md:max-w-[52%] overflow-scroll md:overflow-visible" id="work_cont">

                        </div>
                        <button class="absolute md:bottom-10 md:left-10 -bottom-1 left-15 w-[calc(2vw+1.7rem)] h-[calc(2vw+1.5rem)] bg-green-600 rounded-xl flex justify-center items-center hover:scale-120 cursor-pointer add"><p class="text-3xl text-white pointer-events-none">+</p></button>
                    </div>`
                )
            }
        });
    }

    check();

    map.addEventListener('click', (event) => {
        if (event.target.classList.contains('minus_work')) {
            let room = event.target.closest(".room");
            const max = roomCapacities[room.id] || 1;
            const workerEl = event.target.closest('.assigned_worker');
            const id = workerEl.id;
            const selectedWorker = assignedWorkers.find(worker => worker.id == id);
            let unassigned = document.getElementById('unassigned1');


            workers.push(selectedWorker);

            const index = assignedWorkers.findIndex(worker => worker.id == id);
            if (index !== -1) assignedWorkers.splice(index, 1);
                        
            workerEl.remove();
            unassigned.innerHTML = '';
            displayAllUnassigned(1);

            if (room.classList.contains('important') && room.querySelector('#work_cont').children.length < 1) {
                room.style.backgroundColor = 'rgba(238, 91, 91, 0.529)';
            }
            else {
                room.style.backgroundColor = '';
            }
            if (room.querySelector('#work_cont').children.length > 0 && room.querySelector('.cont')) {
                room.querySelector('.cont').insertAdjacentHTML('beforeend',
                    `
                        <button class="absolute md:bottom-10 md:left-10 -bottom-1 w-[calc(2vw+1.7rem)] h-[calc(2vw+1.5rem)] bg-green-600 rounded-xl flex justify-center items-center hover:scale-120 cursor-pointer add"><p class="text-3xl text-white pointer-events-none">+</p></button>
                    `
                )
            }

        }
        if (event.target.classList.contains('add')) {
            let room = event.target.closest(".room");
            let room_id = event.target.closest(".room").id;

            const room_title = event.target.parentElement.previousElementSibling;

            overlay.classList.add('open');
            overlay.innerHTML = `
                <div class="modal bg-white w-[88%] md:w-[500px] h-[82vh] md:h-full overflow-scroll rounded-2xl p-10 flex flex-col items-center gap-4" id="assignModal" >
                    <button class="absolute close top-10 right-10 scale-[200%]" id="closeModalBtn">&times;</button>
                    <strong><h2 class="text-2xl text-green-400">${room_title.textContent}</h2></strong>
                    <section class="w-full h-[100vh] pt-10 flex flex-col items-center gap-4 order-1 md:order-0" id="unassigned2">
                        
                    </section>
                </div>
                `;
            if (room.classList.contains('all')) {
                displayAllUnassigned(2)
            } else {
                let filtered_workers = [];

                workers.forEach(worker => {
                    if (worker.room == room.id || worker.room == 'all' || (worker.room == 'staff' && room.id !== 'vault')) {
                        filtered_workers.push(worker);
                    }
                });

                const filteredWorkersHTML = filtered_workers.map(worker => createWorkerHTML(worker)).join('');
                let unassigned = document.getElementById('unassigned2');
                unassigned.insertAdjacentHTML("beforeend", filteredWorkersHTML);
            }
            const closeBtn = document.getElementById("closeModalBtn");
            closeBtn.addEventListener('click', closeModal);

            const max = roomCapacities[room.id] || 1;
            const assignModal = document.getElementById('assignModal');
            assignModal.addEventListener('click', (event) => {
                if (event.target.classList.contains('un_worker')) {
                    if (room.querySelector('#work_cont').children.length >= max) {
                        Swal.fire({
                            icon: "error",
                            text: "You can't add more workers here",
                        });
                    }
                    else {
                        let selectedWorker = workers.find(worker => worker.id == event.target.id);
                        assignedWorkers.push(selectedWorker);

                        //get the index of the assigned worker
                        const index = workers.findIndex(worker => worker.id == event.target.id);
                        if (index !== -1) workers.splice(index, 1);
                        
                        room.querySelector('#work_cont').insertAdjacentHTML('afterbegin', `
                            <div class="relative w-15 assigned_worker" id="${selectedWorker.id}">
                            <button class="absolute -top-2 -right-1 h-5 w-5 rounded-full flex items-center justify-center bg-red-500 text-white shadow-[0_0_10px_gray] cursor-pointer hover:scale-110 transition-transform minus_work">
                                <svg class="pointer-events-none" viewBox="0 0 24 24" width="24" height="24">
                                    <path d="M7 12 L17 12" stroke="black" stroke-width="2" />
                                </svg>
                            </button>
                                <img class="rounded-[100%] shadow-[0_0_10px_green]" src=${selectedWorker.photo} alt="">
                                <div class="bg-white rounded-lg"><h2 class="text-[10px] text-center w-full px-2">${selectedWorker.name}</h2></div>
                            </div>
                        `)
                        event.target.remove()
                        unassigned.innerHTML = '';
                        displayAllUnassigned(1);
                    }
                }
                if (room.classList.contains('important') && room.children.length < 2) {
                    room.style.backgroundColor = 'rgba(238, 91, 91, 0.529)';
                }
                else if(event.target.classList.contains('un_worker') && room.children.length >= 2) {
                    room.style.backgroundColor = '';
                }

                if (room.querySelector('#work_cont').children.length >= max) {
                    room.querySelector('.add').remove()
                }
            });
        }
    })

    function createWorkerHTML(worker) {
        return `
        <div class="w-[90%] h-[85px] bg-white rounded-2xl shadow-[0_0_10px_gray] p-3 flex gap-3 items-start cursor-pointer un_worker" id="${worker.id}">
            <img src="${worker.photo}" alt="profile" class="w-[60px] rounded-[100%] object-cover pointer-events-none">
            <div class="flex flex-col justify-between pointer-events-none">
                <div>
                    <h2 class="text-lg font-semibold">${worker.name}</h2>
                    <p class="text-sm text-gray-500">${worker.role}</p>
                </div>
            </div>
        </div>
        `;
    }

    function createExpHTML(exp) {
        return `
                <li class="self-start">
                    <h3><strong><span class="text-green-800 text-xl">From</span></strong> ${exp.start} <strong><span class="text-green-800 text-xl">To</span></strong> ${exp.end}</h3>
                    <h4><strong> <span class="text-green-800 text-xl">Company:</span></strong> ${exp.company}</h4> 
                    <h4><strong><span class="text-green-800 text-xl">Description:</span></strong> ${exp.description}</h4>
                </li>
            `;
    }

    //Inserting the Workers dynamically in the unassigned section
    function displayAllUnassigned(choice) {
        let unassigned = document.getElementById(`unassigned${choice}`);
        const allWorkersHTML = workers.map(worker => createWorkerHTML(worker)).join('');
        unassigned.insertAdjacentHTML("beforeend", allWorkersHTML);
    }

    displayAllUnassigned(1);

    let un_workers = document.querySelectorAll('.un_worker');
    const overlay = document.getElementById('overlay');
    const closeModalBtn = document.getElementById('closeModalBtn');

    let sideBar = document.getElementById('sideBar')
    let unassigned = document.querySelector('#unassigned1');
    //Display details on click
    sideBar.addEventListener('click', (event) => {
        const selected = event.target;

        let worker = workers.find(worker => worker.id == selected.id);
        if (selected.classList.contains('un_worker')) {
            overlay.classList.add('open');
            overlay.innerHTML = `
                <div class="modal bg-white w-[500px] h-full overflow-scroll rounded-2xl p-10 flex flex-col items-center gap-4">
                    <button class="absolute close top-10 right-10 scale-[200%]" id="closeModalBtn">&times;</button>
                    <img src= ${worker.photo} class="w-[110px] rounded-[100%] object-cover">
                    <h2 class="text-2xl" id="modalTitle">${worker.name}</h2>
                    <h3 class="text-gray-400">${worker.role}</h3>
                    <h3>Email: ${worker.email}</h3>
                    <h3>Phone: ${worker.phone}</h3>
                    <h3></h3>
                    <div class="flex flex-col w-full items-center gap-4" >
                        <h3 class="text-xl self-start">Experiences:</h3>
                        <ol class="list-decimal flex flex-col gap-3" id="experiences">

                        </ol>
                    </div>
                </div>
                `;

            let experiences = document.getElementById('experiences');
            let allExpHTML = worker.experiences.map((exp) => createExpHTML(exp)).join('');
            experiences.insertAdjacentHTML('afterend', allExpHTML)

        } else if (selected.id == 'new_W') {
            addWorker(event.target);
            const pfp_inpt = document.getElementById('photoUrl');
            const preview = document.getElementById('preview');
            let add_exp = document.getElementById('addExperience')

            overlay.querySelector('.modal').addEventListener('click', (e) => {
                if (e.target.classList.contains('minus_exp')) {
                    e.target.closest('.experience-item').remove();
                }
            })

            pfp_inpt.addEventListener('input', (event) => {
                const url = pfp_inpt.value.trim();

                if (url) {
                    preview.src = url;
                }

                preview.onerror = () => {
                    preview.src = 'https://avatars.githubusercontent.com/u/0?v=4&s';
                };
            });

            add_exp.onclick = () => {
                overlay.querySelector('#experiences').insertAdjacentHTML('beforeend',
                    `
                    <div class="relative experience-item border rounded-xl p-4 flex flex-col gap-3 mb-8">
                        <button type="button" class="absolute h-5 w-5 -top-2 -right-1 scale-200 flex justify-center items-start bg-red-500 rounded-xl leading-none shadow-[0_0_10px_gray] cursor-pointer minus_exp">-</button>

                        <div class="flex flex-col">
                            <label class="font-semibold">Start Date</label>
                            <input type="date" required name="exp_start" class="border rounded-xl p-2">
                        </div>
                        <div class="flex flex-col">
                            <label class="font-semibold">End Date</label>
                            <input type="date" required name="exp_end" class="border rounded-xl p-2">
                        </div>
                        <div class="flex flex-col">
                            <label class="font-semibold">Position</label>
                            <input type="text" required name="exp_position" class="border rounded-xl p-2">
                        </div>
                        <div class="flex flex-col">
                            <label class="font-semibold">Company</label>
                            <input type="text" required name="exp_company" class="border rounded-xl p-2">
                        </div>
                        <div class="flex flex-col">
                            <label class="font-semibold">Description</label>
                            <textarea required name="exp_description" class="h-40 resize-none border rounded-xl p-2"></textarea>
                        </div>
                    </div>
                    `
                )
            };

            const form = overlay.querySelector('form');

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const name_RGX = /^([A-Z][a-zA-Z]{1,})( [A-Z][A-Za-z]{1,}){0,2}$/
                const email_RGX = /^[A-Za-z0-9]+@gmail.com$/;
                const phone_RGX = /^\+44\s?7(\d{3}\s?\d{3}\s?\d{3})$/;
                const string_RGX = /^[A-Za-z0-9 .,&'()\-]+$/

                const expBlocks = form.querySelectorAll('.experience-item')

                if (!name_RGX.test(form.querySelector('[name="name"]').value)) {
                    Swal.fire({
                        icon: "error",
                        text: "The name should only contain characters, and shouldn't have more than 3 spaces",
                    });
                    return
                }
                if (!email_RGX.test(form.querySelector('[name="email"]').value)) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Please enter a Valid email",
                    });
                    return
                }
                if (!phone_RGX.test(form.querySelector('[name="phone"]').value)) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Please enter a Valid UK phone number (ex: +44 7XXX XXX XXX) ",
                    });
                    return
                }

                //Comparing the dates from the inputs

                for (const block of expBlocks) {
                    const start = new Date(block.querySelector('[name="exp_start"]').value);
                    const end = new Date(block.querySelector('[name="exp_end"]').value);

                    if (start > end) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Please make sure the start date is earlier than the end date",
                        });
                        return
                    }
                };

                if (!string_RGX.test(form.querySelector('[name="exp_position"]').value)) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Please enter a Valid position",
                    });
                    return
                }
                if (!string_RGX.test(form.querySelector('[name="exp_company"]').value)) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Please enter a Valid Company name",
                    });
                    return
                }
                if (!form.querySelector('[name="exp_description"]').value) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Please fill the desciption",
                    });
                    return
                }
                //Get the value of the room attribute
                const selectedOption = form.role.options[form.role.selectedIndex];
                const room = selectedOption.getAttribute('room');

                const worker = {
                    id: workers.length,
                    name: form.name.value,
                    role: form.role.value,
                    room: room,
                    photo: preview.src,
                    email: form.email.value,
                    phone: form.phone.value,
                    experiences: []
                };

                expBlocks.forEach(block => {
                    worker.experiences.push({
                        start: block.querySelector('[name="exp_start"]').value,
                        end: block.querySelector('[name="exp_end"]').value,
                        position: block.querySelector('[name="exp_position"]').value,
                        company: block.querySelector('[name="exp_company"]').value,
                        description: block.querySelector('[name="exp_description"]').value
                    });
                })

                Swal.fire({
                    icon: "success",
                    text: "The new Worker was added successfuly",
                });

                workers.push(worker);
                closeModal()
                overlay.innerHTML = ''
                //Save into Local 
                localStorage.setItem('workers', JSON.stringify(workers));

                unassigned.innerHTML = '';
                displayAllUnassigned(1)
            });
        }

        const closeBtn = document.getElementById("closeModalBtn");
        closeBtn.addEventListener('click', closeModal);

    });
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            closeModal();
        }
    });

    function closeModal() {
        overlay.classList.remove('open');
    }

    function addWorker(btn) {
        overlay.classList.add('open');
        overlay.innerHTML = `
                <div class="modal bg-white w-[500px] h-full overflow-scroll rounded-2xl p-10 flex flex-col items-center gap-4" >
                    <button class="absolute close top-10 right-10 scale-[200%]" id="closeModalBtn">&times;</button>
                    <form class="w-full flex flex-col gap-5" >
                        <div class="flex flex-col gap-2 w-full">
                            <label class="font-semibold">Name</label>
                            <input type="text" name="name" class="border rounded-lg p-2 w-full" placeholder="Full name">
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <label class="font-semibold">Role</label>
                            <select type="text" name="role" class="border rounded-lg p-2 w-full" required>
                                <option value="" disabled selected>Select a role</option>
                                <option value="manager" room="all">Manager</option>
                                <option value="receptionist" room="reception">Receptionist</option>
                                <option value="technician" room="servers">Technician</option>
                                <option value="Janitor" room="staff">Janitor</option>
                                <option value="security" room="security">Security</option>
                                <option value="other" room="other">Other</option>
                            </select>
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <img src="https://avatars.githubusercontent.com/u/0?v=4&s" class="w-[90px] rounded-[100%] object-cover" id="preview">
                            <label class="font-semibold">Photo URL</label>
                            <input id="photoUrl" type="text" name="photo" class="border rounded-lg p-2 w-full" placeholder="https://...">
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <label class="font-semibold">Email</label>
                            <input type="email" name="email" class="border rounded-lg p-2 w-full" placeholder="example@email.com">
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <label class="font-semibold">Phone</label>
                            <input type="text" name="phone" class="border rounded-lg p-2 w-full" placeholder="+44 ...">
                        </div>

                        <!-- Experiences -->
                        <h2 class="font-bold text-xl mt-4">Experiences</h2>

                        <div id="experiences" class="relative flex flex-col gap-6 w-full">

                            <!-- Experience Template -->
                            <div class="experience-item border rounded-xl p-4 flex flex-col gap-3 mb-8">
                                <div class="flex flex-col">
                                    <label class="font-semibold">Start Date</label>
                                    <input type="date" name="exp_start" class="border rounded-xl p-2">
                                </div>

                                <div class="flex flex-col">
                                    <label class="font-semibold">End Date</label>
                                    <input type="date" name="exp_end" class="border rounded-xl p-2">
                                </div>

                                <div class="flex flex-col">
                                    <label class="font-semibold">Position</label>
                                    <input type="text" name="exp_position" class="border rounded-xl p-2">
                                </div>

                                <div class="flex flex-col">
                                    <label class="font-semibold">Company</label>
                                    <input type="text" name="exp_company" class="border rounded-xl p-2">
                                </div>

                                <div class="flex flex-col">
                                    <label class="font-semibold">Description</label>
                                    <textarea name="exp_description" class="h-40 resize-none border rounded-xl p-2"></textarea>
                                </div>
                            </div>

                        </div>

                        <!-- Add Experience Button -->
                        <button type="button" id="addExperience" class="w-full py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition">
                            Add Experience +
                        </button>

                        <button type="submit" class="w-full py-3 bg-green-600 text-white rounded-xl hover:scale-110 cursor-pointer">
                            Add Worker
                        </button>
                    </form>
                    
                </div> 
            `
    }
});