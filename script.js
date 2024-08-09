// // script.js

// let htmlEditor, cssEditor, jsEditor;

// function initializeEditors() {
//     // Initialize editors
//     htmlEditor = ace.edit("htmlEditor");
//     cssEditor = ace.edit("cssEditor");
//     jsEditor = ace.edit("jsEditor");
    
//     // Set editor themes and modes
//     htmlEditor.setTheme("ace/theme/dracula");
//     htmlEditor.getSession().setMode("ace/mode/html");
//     htmlEditor.setValue("<!DOCTYPE html>\n<html>\n<head>\n    <title>HTML</title>\n</head>\n<body>\n</body>\n</html>", 1);
    
//     cssEditor.setTheme("ace/theme/dracula");
//     cssEditor.getSession().setMode("ace/mode/css");
//     cssEditor.setValue("/* Your CSS code here */", 1);
    
//     jsEditor.setTheme("ace/theme/dracula");
//     jsEditor.getSession().setMode("ace/mode/javascript");
//     jsEditor.setValue("// Your JavaScript code here", 1);
    
//     // Set up event listeners for editor changes
//     [htmlEditor, cssEditor, jsEditor].forEach(editor => {
//         editor.getSession().on('change', () => {
//             updatePreview();
//         });
//     });

//     // Set the default view
//     showEditor('html');
// }

// function showEditor(editor) {
//     const editors = document.querySelectorAll('.editor');
//     const buttons = document.querySelectorAll('.tabButton');

//     editors.forEach(e => e.classList.remove('active'));
//     buttons.forEach(b => b.classList.remove('active'));

//     if (editor === 'all') {
//         editors.forEach(e => e.classList.add('active'));
//     } else {
//         document.getElementById(`${editor}Editor`).classList.add('active');
//         document.querySelector(`.tabButton[onclick="showEditor('${editor}')"]`).classList.add('active');
//     }

//     updatePreview();
// }

// function getUserCode() {
//     return htmlEditor.getValue() + "\n" + "<style>" + "\n" + cssEditor.getValue() + "\n" + "</style>" + "\n" +  "<script>" + "\n" + jsEditor.getValue() + "\n" + "</script>";
// }

// function updatePreview() {
//     // const htmlCode = htmlEditor.getValue();
//     // const cssCode = `<style>${cssEditor.getValue()}</style>`;
//     // const jsCode = `<script>${jsEditor.getValue()}<\/script>`;

//     var code = document.getElementById('preview').contentWindow.document;
//     code.open();
//     code.write(getUserCode());
//     code.close();

//     // const iframe = document.getElementById('preview');
//     // const doc = iframe.contentDocument || iframe.contentWindow.document;
//     // doc.open();
//     // doc.write(htmlCode + cssCode + jsCode);
//     // doc.close();
// }

// function toggleTheme() {
//     const body = document.body;
//     const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';

//     if (currentTheme === 'dark-mode') {
//         body.classList.remove('dark-mode');
//         body.classList.add('light-mode');
//         document.getElementById('toggleTheme').classList.remove('dark-mode');
//     } else {
//         body.classList.remove('light-mode');
//         body.classList.add('dark-mode');
//         document.getElementById('toggleTheme').classList.add('dark-mode');
//     }

//     updatePreview(); // Update preview to apply theme changes
// }

let htmlEditor, cssEditor, jsEditor;

function initializeEditors() {
    alert("Code Preview is Below")
    // Initialize editors
    htmlEditor = ace.edit("htmlEditor");
    cssEditor = ace.edit("cssEditor");
    jsEditor = ace.edit("jsEditor");
    
    // Set editor themes and modes
    htmlEditor.setTheme("ace/theme/monokai");  // Use light theme for initial setup
    htmlEditor.getSession().setMode("ace/mode/html");
    htmlEditor.setValue("<!DOCTYPE html>\n<html>\n<head>\n    <title>Document</title>\n</head>\n<body>\n</body>\n</html>", 1);
    
    cssEditor.setTheme("ace/theme/monokai");
    cssEditor.getSession().setMode("ace/mode/css");
    cssEditor.setValue("/* Your CSS code here */", 1);
    
    jsEditor.setTheme("ace/theme/monokai");
    jsEditor.getSession().setMode("ace/mode/javascript");
    jsEditor.setValue("// Your JavaScript code here", 1);
    
    // Set up event listeners for editor changes
    [htmlEditor, cssEditor, jsEditor].forEach(editor => {
        editor.getSession().on('change', updatePreview);
    });

    // Set the default view and theme
    showEditor('html');
    setInitialTheme();
}

function showEditor(editor) {
    const editors = document.querySelectorAll('.editor');
    const buttons = document.querySelectorAll('.tabButton');

    editors.forEach(e => e.classList.remove('active'));
    buttons.forEach(b => b.classList.remove('active'));

    if (editor === 'all') {
        editors.forEach(e => e.classList.add('active'));
    } else {
        document.getElementById(`${editor}Editor`).classList.add('active');
        document.querySelector(`.tabButton[onclick="showEditor('${editor}')"]`).classList.add('active');
    }

    updatePreview();
}

function getUserCode() {
    return htmlEditor.getValue() + "\n" + "<style>" + "\n" + cssEditor.getValue() + "\n" + "</style>" + "\n" + "<script>" + "\n" + jsEditor.getValue() + "\n" + "</script>";
}

function updatePreview() {
    const iframe = document.getElementById('preview');
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(getUserCode());
    doc.close();
}

function setInitialTheme() {
    // Set initial theme to light mode
    const body = document.body;
    body.classList.add('light-mode');
    document.getElementById('themeToggle').checked = false; // Make sure toggle is off for light mode
}

function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode', !isDarkMode);

    const toggleButton = document.getElementById('themeToggle');
    toggleButton.checked = isDarkMode;

    // Update editors to reflect theme change
    const theme = isDarkMode ? "ace/theme/dracula" : "ace/theme/monokai";
    htmlEditor.setTheme(theme);
    cssEditor.setTheme(theme);
    jsEditor.setTheme(theme);

    updatePreview(); // Update preview to apply theme changes
}

// Initialize editors when the window loads
window.onload = initializeEditors;
