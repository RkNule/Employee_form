const jpdbBaseURL = "http://api.login2explore.com:5577";
const jpdbIML = "/api/iml";
const empDBName = "Employee";
const empRelationName = "Emp-Rel";
const connToken = "90931718|-31949214467404062|90963637";

$(document).ready(() => {
    $("#save").click(() => saveEmployee());
    $("#change").click(() => changeEmployee());
    $("#reset").click(() => resetForm());
});

const validateAndGetFormData = () => {
    const empId = $("#empId").val();
    const empName = $("#empName").val();
    const empEmail = $("#empEmail").val();

    if (!empId || !empName || !empEmail) {
        alert("Please fill all fields");
        return "";
    }

    const jsonStrObj = {
        empId: empId,
        empName: empName,
        empEmail: empEmail
    };

    return JSON.stringify(jsonStrObj);
};

const createPUTRequest = (connToken, jsonObj, dbName, relName) => {
    const putRequest = {
        token: connToken,
        dbName: dbName,
        cmd: "PUT",
        rel: relName,
        jsonStr: jsonObj
    };

    return JSON.stringify(putRequest);
};

const executeCommandAtGivenBaseUrl = (reqString, dbBaseUrl, apiEndPointUrl) => {
    let result;
    $.ajax({
        type: 'POST',
        url: dbBaseUrl + apiEndPointUrl,
        data: reqString,
        contentType: 'application/json',
        async: false,
        success: (res) => {
            result = JSON.parse(res);
        },
        error: (xhr) => {
            result = JSON.parse(xhr.responseText);
        }
    });
    return result;
};

const saveEmployee = () => {
    const jsonStr = validateAndGetFormData();
    if (jsonStr === "") return;

    const putRequest = createPUTRequest(connToken, jsonStr, empDBName, empRelationName);
    const result = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);

    alert("Data Saved: " + JSON.stringify(result));
    resetForm();
};

const changeEmployee = () => {
    const jsonStr = validateAndGetFormData();
    if (jsonStr === "") return;

    const putRequest = createPUTRequest(connToken, jsonStr, empDBName, empRelationName);
    const result = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);

    alert("Data Updated: " + JSON.stringify(result));
    resetForm();
};

const resetForm = () => {
    $("#empId").val("");
    $("#empName").val("");
    $("#empEmail").val("");
    $("#empId").focus();
};
