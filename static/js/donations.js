/**
 * 
 * @param {String} text 
 */
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show Toast Notification
        const toast = document.getElementById("toast");
        toast.className = "toast show";
        
        // Hide after 2.5 seconds
        setTimeout(() => { 
            toast.className = toast.className.replace("show", ""); 
        }, 2500);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}