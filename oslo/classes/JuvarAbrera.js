class JuvarAbrera {
    // static API_ROOT_URL = "http://localhost:8001";
    static API_ROOT_URL = "https://api.juvarabrera.com";
    constructor() {
        navigator.serviceWorker.getRegistrations().then( function(registrations) { 
            for(let registration of registrations) {
                registration.unregister();
            }
            if(registrations.length > 0) {
                window.location.reload();
            }
        }); 
    }
}