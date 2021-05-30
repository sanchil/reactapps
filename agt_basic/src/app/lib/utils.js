import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export const clipImage = (w, h, imgsrc, sig) => {

  const cnv = document.createElement('canvas');

  if (cnv !== null) {

    cnv.width = w;
    cnv.height = h;
    const CNVASPECT = cnv.width / cnv.height;
    const ctx = cnv.getContext('2d');
    const img = new Image();
    img.src = imgsrc;

    return new Promise((resolve, reject) => {
      img.onload = () => {
        let sx = 0;
        let sy = 0;
        let dx = 0;
        let dy = 0;
        let iw = img.width;
        let ih = img.height;
        let cw = 0;
        let ch = 0;

        const IMGASPECT = iw / ih;


        if (IMGASPECT >= CNVASPECT) {
          //  console.log('Clipping sides : ' + IMGASPECT);
          ch = cnv.height;
          cw = IMGASPECT * ch;
          dx = (cw - cnv.width) * 0.5;


        } else {
          //     console.log('Clipping height : ' + IMGASPECT);
          cw = cnv.width;
          ch = cw / IMGASPECT;

          dy = (ch - cnv.height) * 0.5;

        }
        //  ctx.scale(2.0,2.0);
        ctx.drawImage(img, sx, sy, iw, ih, -dx, -dy, cw, ch);
        resolve(cnv.toDataURL('image/jpeg', 1.0));
      }
      img.onerror = () => {
        if (sig.signal) {
          sig.signal.addEventListener('abort', event => {
            return reject(event);
          });
        }
        return reject(new Error('I am an error'));
      }


    });
  }
}


export const padNum = (pad, number, numlength) => ((number + '').length < numlength) ? Array(pad).fill(0) + number + '' : number;

export const padToTwo = number => number < 10 ? `0${number}`.slice(-2) : number;

export const getFormattedDate = (dt, sep) => padNum(1, dt.getDate(), 2) + sep + padNum(1, dt.getMonth(), 2) + sep + dt.getFullYear();

export const getFormattedTime = (dt, sep) => padNum(1, dt.getHours(), 2) + sep + padNum(1, dt.getMinutes(), 2);


export const securePwd = (pwd) => {
  return bcrypt.hashSync(pwd, 8);
}

export const comparePwd = (pwd, hash) => {
  return bcrypt.compareSync(pwd, hash);
}

export const parseRedisResponseToObj = (str) => {
  //let s = str.replace(/[\\"]/gi,'"');

  if (str) {
    const regexp = /\{.+\}/mgi;
    let arr = regexp.exec(str);
    if (arr) {
      return arr[0];
    }
    //  const regexp1 = /\\\"/mgi;
    //  n = arr[0].replace(regexp1, '"');      

  }


  //return "";
  return {};


}


// https://javascript.info/cookie. For more info on cookie apis


export const setCookie = (cname, cvalue, cookieopts) => {

  let extensions = '';
  let d = new Date();
  let mxage = ';max-age=';
  let expires = ";expires=";
  let ckpath = ';path=';


  if (cookieopts && cookieopts.age) {
    d.setTime(d.getTime() + (cookieopts.age * 24 * 60 * 60 * 1000));

  } else {
    d.setTime(d.getTime() + 20000);
  }
  extensions = extensions + expires + d.toUTCString();

  if (cookieopts && cookieopts['max-age']) {
    extensions = extensions + mxage + cookieopts['max-age'];
  }


  if (cookieopts && cookieopts.path) {
    extensions = extensions + ckpath + cookieopts.path;
  }



  console.log('cokkie string is: ' + cname + "=" + cvalue + extensions)
  document.cookie = cname + "=" + cvalue + extensions;

}


/* export const getCookie = (cname)=> {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
 */

export const getCookie = (name) => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
export const checkCookie = () => {
  var sessid = getCookie("sessid");
  if (sessid != "") {
    console.log("Welcome again " + sessid);
  } else {
    console.log("Sessid id expired. Pls login again");
  } /* else {
      username = prompt("Please enter your name:", "");
      if (username != "" && username != null) {
        setCookie("username", username, 365);
      }
    } */
}

export const deleteCookie = (name) => {
  setCookie(name, "", {
    'max-age': -1
  })
}

export const checkRunEnv = () => {
  if (typeof window !== 'undefined') {
    return 'client'
  } else {
    return 'server';
  }
}



export const processAccessToken = (location, ...rest) => {

  let urlFragment = "";
  const [label, data] = [...rest];
  // console.log('Location: '+JSON.stringify(location));

  if (location.hash.substring(1).length > 0) {
    urlFragment = location.hash.substring(1);
    // console.log('location has a hash: '+ urlFragment);
  } else if (location.search.substring(1).length > 0) {
    urlFragment = location.search.substring(1);
    //  console.log('location has a s/arch: '+ urlFragment);
  }

  //const urlFragment = location.search.substring(1);
  //const urlFragment = location.hash.substring(1);

  //console.log("URL Fragment: "+ urlFragment);

  const codeparams = {};
  const regex = /([^&=]+)=([^&]*)/gm;
  let m = 0;

  if(data&&label&&label==='googleToken'){
    localStorage.setItem(label, JSON.stringify(data));
  }else if (data) {

    while (m = regex.exec(data)) {
      codeparams[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
 //  console.log('Twitter Code params: ' + JSON.stringify(codeparams));
    localStorage.setItem(label, JSON.stringify(codeparams));

  } else {
    while (m = regex.exec(urlFragment)) {
      codeparams[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

   // console.log('Code params: ' + JSON.stringify(codeparams));

    if (codeparams['access_token'] &&
      (typeof codeparams['access_token'] !== 'undefined') &&
      codeparams['access_token'].length !== "") {
      //  console.log('Access token: ' + JSON.stringify(codeparams));
      localStorage.setItem(label, JSON.stringify(codeparams));
    }

  }

  /* else if (codeparams['oauth_token'] &&
    (typeof codeparams['oauth_token'] !== 'undefined') &&
    codeparams['oauth_token'].length !== "") {
    //  console.log('Access token: ' + JSON.stringify(codeparams));
    localStorage.setItem(label, JSON.stringify(codeparams));
  }*/

}

export const getUid = () => {


  return uuidv4();


}
