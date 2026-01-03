const { useState, useEffect } = React;

const VolunteerForm = () => {
    // 1. STATEFUL COMPONENT
    const [formData, setFormData] = useState({
        name: '',
        reason: 'information', // Default value
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // 2. LOAD FROM LOCAL STORAGE ON MOUNT
    useEffect(() => {
        const savedData = localStorage.getItem('volunteer_draft');
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
        localStorage.setItem('volunteer_draft', JSON.stringify(updatedData));
        
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

        // Phone Regex (Simple Portugal format check: 9 digits)
        const phoneRegex = /^[0-9]{9}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            tempErrors.phone = "Insira um número válido (9 dígitos).";
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
            // Save FINAL submission to Local Storage (as requested)
            const submission = {
                ...formData,
                date: new Date().toISOString()
            };
            
            // We store submitted forms in an array, preserving history
            const previousSubmissions = JSON.parse(localStorage.getItem('volunteer_submissions') || "[]");
            previousSubmissions.push(submission);
            localStorage.setItem('volunteer_submissions', JSON.stringify(previousSubmissions));

            // Clear draft
            localStorage.removeItem('volunteer_draft');
            
            console.log("Form Submitted:", submission);
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <div className="success-message">
                <h3>Obrigado, {formData.name}!</h3>
                <p>Recebemos a tua candidatura. Entraremos em contacto brevemente.</p>
                <button 
                    className="btn btn-outline" 
                    style={{marginTop: '1rem', backgroundColor: 'transparent'}}
                    onClick={() => {
                        setFormData({ name: '', reason: 'information', email: '', phone: '', message: '' });
                        setIsSubmitted(false);
                    }}
                >
                    Enviar nova mensagem
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="react-form">
            
            {/* Name Field */}
            <div className="form-group">
                <label htmlFor="name">Nome Completo *</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="O teu nome"
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            {/* Reason Select */}
            <div className="form-group">
                <label htmlFor="reason">Motivo do Contacto</label>
                <select 
                    id="reason" 
                    name="reason" 
                    value={formData.reason} 
                    onChange={handleChange}
                >
                    <option value="information">Informações Gerais</option>
                    <option value="volunteer_apply">Candidatura a Voluntário</option>
                    <option value="donation_help">Ajuda com Doações</option>
                    <option value="complaint">Reclamação / Sugestão</option>
                </select>
            </div>

            {/* Email Field */}
            <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="exemplo@email.com"
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            {/* Phone Field */}
            <div className="form-group">
                <label htmlFor="phone">Telemóvel (Opcional)</label>
                <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="912345678"
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
            </div>

            {/* Message Field */}
            <div className="form-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea 
                    id="message" 
                    name="message" 
                    rows="4" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Diz-nos como gostarias de ajudar..."
                ></textarea>
                {errors.message && <span className="error-msg">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
                Enviar Candidatura
            </button>
        </form>
    );
};

// Mount the component
const root = ReactDOM.createRoot(document.getElementById('volunteer-form-root'));
root.render(<VolunteerForm />);