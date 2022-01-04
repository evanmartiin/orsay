export default class Device
{
  
   public isMobile: any
   public isSafari: any

   private doc: any
   private docEl: any
   private requestFullScreen: any
   private cancelFullScreen: any

    constructor()
    {
        //this.mobileDetect()
    }  
    
    mobileDetect = () => {
        this.isMobile = /mobi/i.test(navigator.userAgent);
        this.isSafari = (navigator.vendor.match(/apple/i) || "").length > 0

        if (this.isMobile && !this.isSafari) {
            
            // on passe en fullscreen et on fait tourner l'écran quand c'est mobile
            this.fullScreenLandscape()

        } else if(this.isMobile && this.isSafari) {
            
            // quand c'est safari Mobile, on affiche un messsage disant de rotate
            this.safariMobile()

        } else {

            // quand c'est desktop on dit de passer sur tel
            this.desktopMode()
        }
    }

    fullScreenLandscape = () => {
        this.doc = window.document;
        this.docEl = this.doc.documentElement;

        this.requestFullScreen = this.docEl.requestFullscreen || this.docEl.mozRequestFullScreen || this.docEl.webkitRequestFullScreen || this.docEl.msRequestFullscreen;
        this.cancelFullScreen = this.doc.exitFullscreen || this.doc.mozCancelFullScreen || this.doc.webkitExitFullscreen || this.doc.msExitFullscreen;

        if (!this.doc.fullscreenElement && !this.doc.mozFullScreenElement && !this.doc.webkitFullscreenElement && !this.doc.msFullscreenElement) {
            this.requestFullScreen.call(this.docEl);
            window.screen.orientation.lock('landscape')
        }
        else {
            this.cancelFullScreen.call(this.doc);
            window.screen.orientation.lock('portrait')
        }

    }

    safariMobile = () => { 
        const mql = window.matchMedia("(orientation: portrait)");

        if(mql.matches) {  

            // Portrait orientation
            this.displayOrientationMessage()
	   
        } else {  

	        // Landscape orientation
            
        }

        mql.addEventListener('change', (m)=> {
            if (m.matches) {
               
                this.displayOrientationMessage()

            } else {
                // Changed to landscape
            }
        })
    }

    displayOrientationMessage = () => {

    }

    desktopMode = () => { 

    }
}