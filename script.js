//Author: Amir Ali Rahman
//Website: www.codinghub360.com
//GitHub: https://github.com/amir-ali-rahman
//Instagram: https://www.instagram.com/amir_ali_rahman

function displayData() {
    var storedData = JSON.parse(localStorage.getItem('studentData'));
    var addRow = document.getElementById("stdTable");
    addRow.innerHTML = '';
    addRow.innerHTML = `<div class="tableHead">
    <div class="tableCol">Admission No.</div>
    <div class="tableCol">Student Name</div>
    <div class="tableCol">Father's Name</div>
    <div class="tableCol">Course</div>
    <div class="tableCol">Actions</div>
</div>`;
    if (storedData != null) {
        for (let i = 0; i < storedData.length; i++) {
        addRow.innerHTML += `
        <div class="tableRow">
                <div class="tableCol">${storedData[i].admissionNo}</div>
                <div class="tableCol">${storedData[i].studentName}</div>
                <div class="tableCol">${storedData[i].fatherName}</div>
                <div class="tableCol">${storedData[i].course}</div>
                <div class="tableCol"><button class="editBtn" onClick="editStudent(${storedData[i].uniqueKey})">Edit</button> <button class="deleteBtn" onClick="deleteStudent(${storedData[i].uniqueKey})">Delete</button></div>
                </div>`;
    }
}
}

function deleteStudent(key) {
    let students = JSON.parse(localStorage.getItem('studentData'));
    if (confirm('Are you sure you want to update this student?')) {
        for (let i = 0; i < students.length; i++) {
            if (students[i].uniqueKey === key) {
                students.splice(i, 1);
                break;
            }
        }
    }
        localStorage.setItem('studentData', JSON.stringify(students));
        displayData();
}


function editStudent(key) {
    let students = JSON.parse(localStorage.getItem('studentData'));
    for (let i = 0; i < students.length; i++) {
        if (students[i].uniqueKey == key) {
            document.getElementById('admission_no').value = students[i].admissionNo;
            document.getElementById('std_name').value = students[i].studentName;
            document.getElementById('f_name').value = students[i].fatherName;
            document.getElementById('course').value = students[i].course;
            document.getElementById('uniqueKey').value = students[i].uniqueKey;
            break;
        }
    }
}

    
function updateStudent() {
        let adm = document.getElementById('admission_no').value;
        let name = document.getElementById('std_name').value;
        let fname = document.getElementById('f_name').value;
        let course = document.getElementById('course').value;
        let uniqueKey = document.getElementById('uniqueKey').value;
        let students = JSON.parse(localStorage.getItem('studentData'));
        let key = 0;
        for (let i = 0; i < students.length; i++) {
            if (students[i].uniqueKey == uniqueKey) {
                key = students[i].uniqueKey;
                break;
            }
        }

        if (confirm('Are you sure you want to update this student?')) {
            for (let i = 0; i < students.length; i++) {
                if (students[i].uniqueKey == key) {
                    students[i].admissionNo = adm;
                    students[i].studentName = name;
                    students[i].fatherName = fname;
                    students[i].course = course;
                    break;
                }
            }
            localStorage.setItem('studentData', JSON.stringify(students));
            emptyFields();
            displayData();
        }
    }

function addStudent() {

    document.querySelector('.dataBox').style.visibility = 'visible';
    var adm = document.getElementById("admission_no").value;
    var name = document.getElementById("std_name").value;
    var fname = document.getElementById("f_name").value;
    var course = document.getElementById("course").value;

    if(adm == '' || name == '' || fname == '' || course == '') {
        document.querySelector('#checkError').style.visibility = 'visible';
        document.querySelector('#checkError').innerText = 'Enter details first';
    } else {
        document.querySelector('#checkError').style.visibility = 'hidden';

        const studentData = {
            admissionNo: adm,
            studentName: name,
            fatherName: fname,
            course: course,
            uniqueKey: Math.floor(Math.random() * 1000)
        };

        const storedDataa = JSON.parse(localStorage.getItem('studentData')) || [];
        storedDataa.push(studentData);
        localStorage.setItem('studentData', JSON.stringify(storedDataa));
        displayData();
        emptyFields();
    }    
}

displayData();
