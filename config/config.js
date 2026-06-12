(function () {
    'use strict';

    // TEMPORARY ACCESS ONLY
    // REMOVE BEFORE PRODUCTION
    var TEMP_USER = 'pahoyos';
    var TEMP_PASSWORD = 'Prada%gata100%';
    var AUTH_KEY = 'paola-content-editor-auth';

    var CONTENT_URL = '../public/content.json';
    var SAVE_URL = '../api/content';

    var loginScreen = document.getElementById('login-screen');
    var editorScreen = document.getElementById('editor-screen');
    var loginForm = document.getElementById('login-form');
    var loginError = document.getElementById('login-error');
    var contentForm = document.getElementById('content-form');
    var statusMessage = document.getElementById('status-message');
    var unsavedIndicator = document.getElementById('unsaved-indicator');
    var previewFrame = document.getElementById('preview-frame');
    var btnSave = document.getElementById('btn-save');
    var btnRestore = document.getElementById('btn-restore');
    var btnDownload = document.getElementById('btn-download');

    var savedContent = null;
    var currentContent = null;
    var previewTimer = null;
    var contentLoaded = false;
    var formBuilt = false;

    function showLogin() {
        loginScreen.hidden = false;
        editorScreen.hidden = true;
        contentLoaded = false;
        if (previewFrame) {
            previewFrame.removeAttribute('src');
        }
    }

    function showEditor() {
        loginScreen.hidden = true;
        editorScreen.hidden = false;
        if (previewFrame && !previewFrame.getAttribute('src')) {
            previewFrame.src = '../?preview=1';
        }
    }

    function setStatus(message, type) {
        statusMessage.textContent = message || '';
        statusMessage.className = 'status-message';
        if (type) {
            statusMessage.classList.add('status-message--' + type);
        }
    }

    function cloneContent(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function getNestedValue(obj, path) {
        return path.split('.').reduce(function (current, key) {
            if (current === null || current === undefined) {
                return '';
            }
            return current[key];
        }, obj);
    }

    function setNestedValue(obj, path, value) {
        var keys = path.split('.');
        var current = obj;
        for (var i = 0; i < keys.length - 1; i++) {
            var key = keys[i];
            if (current[key] === undefined || current[key] === null) {
                current[key] = /^\d+$/.test(keys[i + 1]) ? [] : {};
            }
            current = current[key];
        }
        current[keys[keys.length - 1]] = value;
    }

    function serializeContent(content) {
        return JSON.stringify(content);
    }

    function updateUnsavedState() {
        if (!savedContent || !currentContent) {
            unsavedIndicator.hidden = true;
            return;
        }
        unsavedIndicator.hidden = serializeContent(currentContent) === serializeContent(savedContent);
    }

    function sendPreview(content) {
        if (!previewFrame || !previewFrame.contentWindow) {
            return;
        }
        previewFrame.contentWindow.postMessage({
            type: 'PREVIEW_CONTENT',
            content: content
        }, '*');
    }

    function schedulePreview() {
        if (!contentLoaded || !currentContent) {
            return;
        }
        clearTimeout(previewTimer);
        previewTimer = setTimeout(function () {
            sendPreview(currentContent);
        }, 350);
    }

    function createField(field) {
        var wrapper = document.createElement('div');
        wrapper.className = 'form-field';
        if (field.accent) {
            wrapper.classList.add('form-field--accent');
        }

        var label = document.createElement('label');
        label.className = 'form-label';
        label.textContent = field.label;
        label.setAttribute('for', 'field-' + field.path.replace(/\./g, '-'));

        var control;
        if (field.type === 'textarea') {
            control = document.createElement('textarea');
            control.className = 'form-textarea';
            control.rows = 3;
        } else {
            control = document.createElement('input');
            control.type = 'text';
            control.className = 'form-input';
        }

        control.id = 'field-' + field.path.replace(/\./g, '-');
        control.dataset.path = field.path;

        if (field.accent) {
            var hint = document.createElement('span');
            hint.className = 'form-hint';
            hint.textContent = 'Texto con estilo destacado en el sitio';
            wrapper.appendChild(label);
            wrapper.appendChild(hint);
        } else {
            wrapper.appendChild(label);
        }

        wrapper.appendChild(control);
        return wrapper;
    }

    function renderFields(container, fields) {
        fields.forEach(function (field) {
            container.appendChild(createField(field));
        });
    }

    function buildForm() {
        if (formBuilt || !contentForm) {
            return;
        }

        window.CONTENT_FORM_SECTIONS.forEach(function (section) {
            var sectionEl = document.createElement('section');
            sectionEl.className = 'form-section';

            var heading = document.createElement('h3');
            heading.className = 'form-section__title';
            heading.textContent = section.title;
            sectionEl.appendChild(heading);

            if (section.description) {
                var desc = document.createElement('p');
                desc.className = 'form-section__desc';
                desc.textContent = section.description;
                sectionEl.appendChild(desc);
            }

            if (section.fields) {
                var fieldsWrap = document.createElement('div');
                fieldsWrap.className = 'form-section__fields';
                renderFields(fieldsWrap, section.fields);
                sectionEl.appendChild(fieldsWrap);
            }

            if (section.groups) {
                section.groups.forEach(function (group) {
                    var groupEl = document.createElement('div');
                    groupEl.className = 'form-group';

                    var groupTitle = document.createElement('h4');
                    groupTitle.className = 'form-group__title';
                    groupTitle.textContent = group.title;
                    groupEl.appendChild(groupTitle);

                    var groupFields = document.createElement('div');
                    groupFields.className = 'form-group__fields';
                    renderFields(groupFields, group.fields);
                    groupEl.appendChild(groupFields);
                    sectionEl.appendChild(groupEl);
                });
            }

            contentForm.appendChild(sectionEl);
        });

        contentForm.addEventListener('input', onFormInput);
        formBuilt = true;
    }

    function populateForm(content) {
        contentForm.querySelectorAll('[data-path]').forEach(function (control) {
            var value = getNestedValue(content, control.dataset.path);
            control.value = value === undefined || value === null ? '' : String(value);
        });
    }

    function onFormInput(event) {
        var control = event.target;
        if (!control.dataset.path || !currentContent) {
            return;
        }
        setNestedValue(currentContent, control.dataset.path, control.value);
        updateUnsavedState();
        schedulePreview();
    }

    async function loadContent() {
        var response = await fetch(CONTENT_URL);
        if (!response.ok) {
            throw new Error('No se pudo cargar el contenido.');
        }
        var content = await response.json();
        buildForm();
        savedContent = cloneContent(content);
        currentContent = cloneContent(content);
        populateForm(currentContent);
        contentLoaded = true;
        updateUnsavedState();
        schedulePreview();
    }

    async function saveContent() {
        if (!currentContent) {
            return;
        }

        try {
            var response = await fetch(SAVE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentContent, null, 2)
            });

            if (!response.ok) {
                var errorData = await response.json().catch(function () {
                    return { error: 'Error al guardar.' };
                });
                throw new Error(errorData.error || 'Error al guardar.');
            }

            savedContent = cloneContent(currentContent);
            updateUnsavedState();
            sendPreview(currentContent);
            setStatus('Cambios guardados correctamente.', 'success');
        } catch (error) {
            setStatus(error.message, 'error');
        }
    }

    function restoreContent() {
        if (!savedContent) {
            return;
        }
        currentContent = cloneContent(savedContent);
        populateForm(currentContent);
        updateUnsavedState();
        sendPreview(currentContent);
        setStatus('Se restauró la última versión guardada.', 'success');
    }

    function downloadBackup() {
        if (!currentContent) {
            return;
        }

        var blob = new Blob([JSON.stringify(currentContent, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        var timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.href = url;
        link.download = 'content-backup-' + timestamp + '.json';
        link.click();
        URL.revokeObjectURL(url);
        setStatus('Backup descargado.', 'success');
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var user = document.getElementById('login-user').value.trim();
        var password = document.getElementById('login-password').value;

        if (user === TEMP_USER && password === TEMP_PASSWORD) {
            localStorage.setItem(AUTH_KEY, 'true');
            loginError.hidden = true;
            showEditor();
            loadContent().catch(function (error) {
                setStatus(error.message, 'error');
            });
            return;
        }

        loginError.hidden = false;
        loginError.textContent = 'Usuario o contraseña incorrectos.';
    });

    btnSave.addEventListener('click', saveContent);
    btnRestore.addEventListener('click', restoreContent);
    btnDownload.addEventListener('click', downloadBackup);

    window.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'PREVIEW_READY' && currentContent) {
            sendPreview(currentContent);
        }
    });

    previewFrame.addEventListener('load', function () {
        setTimeout(function () {
            if (contentLoaded && currentContent) {
                sendPreview(currentContent);
            }
        }, 300);
    });

    window.addEventListener('beforeunload', function (event) {
        if (savedContent && currentContent && serializeContent(currentContent) !== serializeContent(savedContent)) {
            event.preventDefault();
            event.returnValue = '';
        }
    });

    if (localStorage.getItem(AUTH_KEY) === 'true') {
        showEditor();
        loadContent().catch(function (error) {
            setStatus(error.message, 'error');
        });
    } else {
        showLogin();
    }
})();
