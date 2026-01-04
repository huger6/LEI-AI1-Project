const { useState, useEffect } = React;

const ContactForm = () => {
    // 1. STATEFUL COMPONENT
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // 2. LOAD FROM LOCAL STORAGE ON MOUNT
    useEffect(() => {
        const savedData = localStorage.getItem('contact_draft');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    // 3. HANDLE INPUT CHANGE
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };
        
        setFormData(updatedData);
        
        // Save draft to local storage instantly as user types (User convenience)
        localStorage.setItem('contact_draft', JSON.stringify(updatedData));
        
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    // 4. VALIDATION LOGIC
    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            tempErrors.name = "O nome é obrigatório.";
            isValid = false;
        }

        // Email Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            tempErrors.email = "O email é obrigatório.";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Formato de email inválido.";
            isValid = false;
        }

        if (!formData.subject) {
            tempErrors.subject = "Selecione um assunto.";
            isValid = false;
        }

        if (!formData.message.trim()) {
            tempErrors.message = "A mensagem é obrigatória.";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    // 5. HANDLE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            // Save FINAL submission to Local Storage
            const submission = {
                ...formData,
                date: new Date().toISOString()
            };
            
            // Store submitted forms in an array, preserving history
            const previousSubmissions = JSON.parse(localStorage.getItem('contact_submissions') || "[]");
            previousSubmissions.push(submission);
            localStorage.setItem('contact_submissions', JSON.stringify(previousSubmissions));

            // Clear draft
            localStorage.removeItem('contact_draft');
            
            console.log("Contact Form Submitted:", submission);
            setIsSubmitted(true);
        }
    };

    // Get subject label for display
    const getSubjectLabel = (value) => {
        const subjects = {
            'adocao': 'Questão sobre Adoção',
            'voluntariado': 'Candidatura a Voluntário',
            'parceria': 'Proposta de Parceria',
            'geral': 'Outro Assunto / Geral'
        };
        return subjects[value] || value;
    };

    if (isSubmitted) {
        return (
            <div className="success-message">
                <div className="success-icon">
                    <i className="bi bi-check-circle-fill"></i>
                </div>
                <h3>Obrigado, {formData.name}!</h3>
                <p>A sua mensagem sobre "<strong>{getSubjectLabel(formData.subject)}</strong>" foi enviada com sucesso.</p>
                <p className="success-note">Responderemos para <strong>{formData.email}</strong> num prazo de 48 horas.</p>
                <button 
                    className="btn btn-outline" 
                    onClick={() => {
                        setFormData({ name: '', email: '', subject: '', message: '' });
                        setIsSubmitted(false);
                    }}
                >
                    Enviar nova mensagem
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="react-form contact-react-form">
            
            {/* Name Field */}
            <div className="form-group">
                <label htmlFor="name" data-i18n="contacts_form_label_name">Nome Completo *</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="O seu nome completo"
                    className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            {/* Email Field */}
            <div className="form-group">
                <label htmlFor="email" data-i18n="contacts_form_label_email">Email *</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="exemplo@email.com"
                    className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            {/* Subject Select */}
            <div className="form-group">
                <label htmlFor="subject" data-i18n="contacts_form_label_subject">Assunto *</label>
                <select 
                    id="subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange}
                    className={errors.subject ? 'input-error' : ''}
                >
                    <option value="" disabled>Selecione um Assunto</option>
                    <option value="adocao">Questão sobre Adoção</option>
                    <option value="voluntariado">Candidatura a Voluntário</option>
                    <option value="parceria">Proposta de Parceria</option>
                    <option value="geral">Outro Assunto / Geral</option>
                </select>
                {errors.subject && <span className="error-msg">{errors.subject}</span>}
            </div>

            {/* Message Field */}
            <div className="form-group">
                <label htmlFor="message" data-i18n="contacts_form_label_message">Mensagem *</label>
                <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Escreva a sua mensagem aqui..."
                    className={errors.message ? 'input-error' : ''}
                ></textarea>
                {errors.message && <span className="error-msg">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary-cta" data-i18n="contacts_form_button_send">
                <i className="bi bi-send"></i>
                <span>Enviar Mensagem</span>
            </button>
        </form>
    );
};

// Mount the component
const root = ReactDOM.createRoot(document.getElementById('contact-form-root'));
root.render(<ContactForm />);
