let totalCreditHours = 0;
let totalWeightedGrades = 0;

// SGPA Input Generation
function generateSubjectInputs() {
    const subjectCount = document.getElementById("subjects").value;
    const subjectInputs = document.getElementById("subject-inputs");
    subjectInputs.innerHTML = ""; // Clear previous inputs

    for (let i = 0; i < subjectCount; i++) {
        subjectInputs.innerHTML += `
            <h3>Subject ${i + 1}</h3>
            <label>First Term Marks:</label>
            <input type="number" id="ft${i}" placeholder="Enter First Term Marks" />
            <label>Mid Term Marks:</label>
            <input type="number" id="mt${i}" placeholder="Enter Mid Term Marks" />
            <label>Final Term Marks:</label>
            <input type="number" id="f${i}" placeholder="Enter Final Term Marks" />
            <label>Quiz Marks:</label>
            <input type="number" id="q${i}" placeholder="Enter Quiz Marks" />
            <label>Presentation Marks:</label>
            <input type="number" id="p${i}" placeholder="Enter Presentation Marks" />
            <label>Attendance Marks:</label>
            <input type="number" id="a${i}" placeholder="Enter Attendance Marks" />
            <label>Credit Hours:</label>
            <input type="number" id="credit${i}" placeholder="Enter Credit Hours" />
        `;
    }

    subjectInputs.innerHTML += `
        <button onclick="calculateSGPA(${subjectCount})">Calculate SGPA</button>
    `;
}

// SGPA Calculation
function calculateSGPA(subjectCount) {
    let semesterCreditHours = 0;
    let semesterWeightedGrades = 0;

    for (let i = 0; i < subjectCount; i++) {
        const ft = parseFloat(document.getElementById(`ft${i}`).value) || 0;
        const mt = parseFloat(document.getElementById(`mt${i}`).value) || 0;
        const f = parseFloat(document.getElementById(`f${i}`).value) || 0;
        const q = parseFloat(document.getElementById(`q${i}`).value) || 0;
        const p = parseFloat(document.getElementById(`p${i}`).value) || 0;
        const a = parseFloat(document.getElementById(`a${i}`).value) || 0;
        const credit = parseFloat(document.getElementById(`credit${i}`).value) || 0;

        const totalMark = (ft * 0.2) + (mt * 0.2) + (f * 0.35) + (q * 0.05) + (p * 0.15) + (a * 0.05);

        let gradePoint = 0;
        if (totalMark >= 80) gradePoint = 4.0;           // A+
        else if (totalMark >= 75) gradePoint = 3.75;     // A
        else if (totalMark >= 70) gradePoint = 3.5;      // A-
        else if (totalMark >= 65) gradePoint = 3.25;     // B+
        else if (totalMark >= 60) gradePoint = 3.0;      // B
        else if (totalMark >= 55) gradePoint = 2.75;     // B-
        else if (totalMark >= 50) gradePoint = 2.5;      // C+
        else if (totalMark >= 45) gradePoint = 2.25;     // C
        else if (totalMark >= 40) gradePoint = 2.0;      // D
        else gradePoint = 0.0;                           // F

        semesterCreditHours += credit;
        semesterWeightedGrades += gradePoint * credit;
    }

    totalCreditHours += semesterCreditHours;
    totalWeightedGrades += semesterWeightedGrades;

    const sgpa = (semesterWeightedGrades / semesterCreditHours).toFixed(2);
    const cgpa = (totalWeightedGrades / totalCreditHours).toFixed(2);

    document.getElementById("sgpa-result").innerText = `SGPA: ${sgpa}`;
    document.getElementById("cgpa-result").innerText = `CGPA: ${cgpa}`;
    document.getElementById("results").style.display = "block";
}

// CGPA Calculation
function calculateCGPA() {
    const totalGradePoints = parseFloat(document.getElementById("total-grade-points").value) || 0;
    const totalCreditHours = parseFloat(document.getElementById("total-credit-hours").value) || 0;

    if (totalCreditHours === 0) {
        alert("Total credit hours cannot be zero.");
        return;
    }

    const cgpa = (totalGradePoints / totalCreditHours).toFixed(2);
    document.getElementById("cgpa-only-result").innerText = `Your CGPA is: ${cgpa}`;
}
