﻿!function(e){function o(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,o),s.l=!0,s.exports}var n={};return o.m=e,o.c=n,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},o.p="",o(o.s=539)}({368:function(e,o,n){"use strict";n.r(o);var t="blocked_resend",s="tutorial",r="a_unblock_form",a="blocked_phone",i="blocked_check",l="blocked_done",c="blocked_call",g="a_deactivate",u="submit_error",d="login_blocked_wrap",_="content",h="box_controls_wrap",f="tutorial_finish_appeal",p="tutorial_step",b="phone_number",B="verification_code",w="new_password",m="verification_code_input",v="new_password_input",y="receive_code_button",k="check_code_button",C="unblock_button",L="_change_phone_button",x="_resend_code_button",T="_phone_input_tooltip",R="_verification_code_input_tooltip",F="_password_input_tooltip",P="finished",M="blocked_about_pass",D="blocked_pass_strength",j=-1,E=0,S=1,H=2,A=3,U=4,N=5,I=13;window.Login={init:function(){each(geByClass("big_text","login_form_wrap"),function(e,o){placeholderInit(o)}),setTimeout(elfocus.pbind(val("email")?"pass":"email"),0);var e=ge("login_form"),o=ge("email"),n=ge("pass");return e.onsubmit=function(){return window.submitQuickLoginForm?trim(o.value)?trim(n.value)?(submitQuickLoginForm(o.value,n.value,{prg:"login_button",params:{expire_input:val("expire_input")}}),!1):(notaBene(n),!1):(notaBene(o),!1):!0},window.loginByCredential&&(o.onclick=loginByCredential,n.onclick=loginByCredential),!0},initBlockedPage:function(){geByClass1(p)&&Login._addTutorialAppeal()},showFastRestore:function(e){var o=gpeByClass("_retore_wrap",e);return each(geByClass("big_text",o),function(e,o){placeholderInit(o)}),addClass(o,"shown"),elfocus("fast_restore_phone"),!1},showInputTooltip:function(e,o){var n=getSize(e);showTooltip(e,{text:o,dir:"left",slideX:15,className:"login_tt",shift:[-n[0]-10,-n[1]/2],onCreate:function(){removeEvent(e,"mouseout"),e.onblur=function(){e.tt.hide()}}})},fastRestoreCheck:function(){cur.frPhone&&(val("fast_restore_phone")==cur.frSentPhone?show("login_fast_restore_code_row","login_fast_restore_resend"):(hide("login_fast_restore_name_row","login_fast_restore_code_row","login_fast_restore_resend"),cur.frResendInt&&(clearInterval(cur.frResendInt),cur.frResendInt=!1)))},fastRestoreResendUpdate:function(e){cur.frResendDelay>0?(ge("login_fast_restore_resend").innerHTML=getLang(e?"join_send_code_via_sms_time":"join_resend_code_time").replace("%s",Math.floor(cur.frResendDelay/60)+":"+(cur.frResendDelay%60<10?"0":"")+cur.frResendDelay%60),cur.frResendDelay--):(ge("login_fast_restore_resend").innerHTML='<a onclick="return Login.fastRestoreResend(this);">'+getLang(e?"join_send_code_via_sms":"join_resend_code")+"</a>",clearInterval(cur.frResendInt),cur.frResendInt=!1)},fastRestoreResend:function(e){var o=val("fast_restore_phone"),n=ce("span",{className:"progress_inline"}),t=domPN(e);return geByClass1("error","login_fast_restore_error")||val("login_fast_restore_error",""),ajax.post("/al_login.php?act=a_fast_restore_resend",{phone:o,restore:cur.frCode},{onDone:function(e){t.innerHTML=e,setTimeout(elfocus("fast_restore_code"),0)},onFail:function(e){return Login.showFastRestoreError(e,"fast_restore_code"),!0},showProgress:function(){e.parentNode==t&&t.replaceChild(n,e)},hideProgress:function(){n.parentNode==t&&t.replaceChild(e,n)}}),!1},fastRestore:function(e,o){if(e=e||window.event,e&&void 0!==e.keyCode&&"click"!=e.type){if(e.keyCode!==KEY.ENTER)return;if(e.target==ge("fast_restore_phone")&&isVisible("login_fast_restore_code_row"))return elfocus("fast_restore_code"),cancelEvent(e)}var n=ge("login_fast_restore_btn"),t=val("fast_restore_phone"),s=void 0;if(t.replace(/[^0-9]/g,"").length<8)return notaBene("fast_restore_phone"),cancelEvent(e);if(val("login_fast_restore_error",""),isVisible("login_fast_restore_code_row")){if(s=val("fast_restore_code"),s.replace(/[^0-9a-z]/g,"").length<5)return notaBene("fast_restore_code"),cancelEvent(e);ajax.post("/al_login.php?act=a_fast_restore_code",{phone:t,code:s,restore:cur.frCode},{onFail:function(e){return Login.showFastRestoreError(e,"fast_restore_code"),!0},showProgress:lockButton.pbind(n),hideProgress:unlockButton.pbind(n)})}else{var r=isVisible("login_fast_restore_name_row")?val("fast_restore_name"):"";if(!r&&isVisible("login_fast_restore_name_row"))return void notaBene("fast_restore_name");ajax.post("/al_login.php?act=a_fast_restore",{phone:t,hash:o,name:r},{onDone:function(e,o,n,s){return e?1==e?(show("login_fast_restore_name_row"),void setTimeout(elfocus("fast_restore_name"),0)):2==e?void Login.showFastRestoreError(s,!1,"error"):(val("login_fast_restore_btn",getLang("login_fast_restore_access")),cur.frCode=o,cur.frSentPhone=t,show("login_fast_restore_code_row","login_fast_restore_resend"),setTimeout(elfocus("fast_restore_code"),0),cur.frResendDelay=n,cur.frResendInt=setInterval(Login.fastRestoreResendUpdate.pbind(4==e),1e3),4==e&&Login.fastRestoreResendUpdate(!0),void(s&&Login.showFastRestoreError(s,!1,"info_msg"))):void setTimeout(Login.fastRestore.pbind(!1),1e3)},onFail:function(e){return e&&Login.showFastRestoreError(e,"fast_restore_phone"),!0},showProgress:lockButton.pbind(n),hideProgress:unlockButton.pbind(n)})}return cancelEvent(e)},showFastRestoreError:function(e,o,n){showMsg("login_fast_restore_error",e,n?n:"error",!0),o=ge(o),o&&(notaBene(o),o.tt&&o.tt.hide&&o.tt.hide())},changeMail:function(e,o,n){var t=trim(val("login_new_mail")),s=1;return t?(e&&(n=cur.changeMailHash),/^\s*[a-zA-Z0-9_\.]+@[a-zA-Z0-9_\.]+\s*$/.test(t)?(e&&(s=0),void ajax.post("/login?act=a_change_mail",{newmail:t,hash:n,from_page:s},{onDone:function(o){var n="login_change_mail_form";e&&(n="login_change_mail_box",curBox().removeButtons(),curBox().addButton(getLang("global_cancel"),null,"no")),val(n,o)},onFail:function(e){return showMsg("login_change_mail_error",e,"error"),!0},showProgress:lockButton.pbind(o),hideProgress:unlockButton.pbind(o)})):showMsg("login_change_mail_error",getLang("reg0_error_bad_email"),"error")):notaBene("login_new_mail")},initChangeMailBox:function(){curBox().removeButtons(),curBox().addButton(getLang("global_cancel"),null,"no"),curBox().addButton(getLang("reg0_change_mail"),Login.changeMail.pbind(1)),elfocus("change_mail_new")},isBanExpired:function(){return cur.unblockDate<Date.now()/1e3},chooseTutorialAnswer:function(e,o){if(!cur.tutorialProcessing){var n=gpeByClass(p,e);hasClass(n,P)||(addClass(e,"on"),Login._removeTutorialAppeal(),ajax.post("support",{act:s,id:o,load:1,ban:nav.objLoc.ban||0},{onDone:function(e){if(addClass(n,P),e){var o=ge(d);o.innerHTML+=e,Login._addTutorialAppeal()}else Login.isBanExpired()?(n.innerHTML+=getTemplate("login_unblock_by_phone"),fadeToggle(geByClass("footer")[0])):(n.innerHTML+=getTemplate("login_wait_for_ban_expiration_message"),fadeToggle(geByClass("footer")[0]));scrollToY(window.innerHeight)},onFail:function(e){return showDoneBox(e),!1},showProgress:function(){cur.tutorialProcessing=!0,lockButton(e)},hideProgress:function(){cur.tutorialProcessing=!1,unlockButton(e)}}))}},_addTutorialAppeal:function(){var e=geByClass(p),o=e.slice(-1)[0],n=geByClass1(_,o);n.innerHTML=getTemplate("login_tutorial_finish_appeal")+n.innerHTML},_removeTutorialAppeal:function(){var e=geByClass(p),o=e.slice(-1)[0],n=geByClass1(_,o);addClass(geByClass1(f,n),"closed")},showUnblockForm:function(){showBox("login",{act:r},{onDone:function(){re(geByClass1(h)),Login._addBoxHotKeys(),Login.updateUnblockFormState()}})},_getUnblockStep:function(){var e=curBox()?curBox().bodyNode:null;if(!e)return-1;var o=geByClass1(b,e),n=geByClass1(B,e);return hasClass(o,P)||hasClass(n,P)?hasClass(n,P)?2:1:0},updateUnblockFormState:function(){var e=curBox()?curBox().bodyNode:null;if(e){var o=geByClass1(b,e),n=geByClass1(B,e),t=geByClass1(w),s=geByClass1(m,e),r=geByClass1(v,e),a=geByClass1(y,e),i=geByClass1(k,e),l=geByClass1(C,e),c=geByClass1(L),g=geByClass1(x),u=Login._getUnblockStep();switch(u){case 0:show(a),hide(i),c&&hide(c),hide(g),hide(l),hide(s),hide(r),o.removeAttribute("readonly"),Login.hideRightTooltip(R),Login.hideRightTooltip(F),elfocus(o);break;case 1:hide(a),show(i),c&&show(c),show(g),hide(l),show(s),hide(r),o.setAttribute("readonly","readonly"),n.removeAttribute("readonly"),Login.hideRightTooltip(T),Login.hideRightTooltip(F),elfocus(n);break;case 2:hide(a),hide(i),c&&hide(c),hide(g),show(l),show(s),show(r),o.setAttribute("readonly","readonly"),n.setAttribute("readonly","readonly"),Login.hideRightTooltip(T),Login.hideRightTooltip(R),elfocus(t);break;default:debugLog("Wrong step in updateUnblockFormState")}}},_showFormMessageBox:function(e,o){var n=o?"login_submit_error":"login_submit_message",t=getTemplate(n,{error_message:e});val("unblock_box_errors_block",t)},_hideFormMessageBox:function(){var e=geByClass1(u);e&&re(e)},_addBoxHotKeys:function(){addEvent(window,"keydown",function(e){var o=curBox()?curBox().bodyNode:null;if(o&&e.keyCode==I&&e.ctrlKey){var n=Login._getUnblockStep();switch(n){case 0:geByClass1(y,o).click();break;case 1:geByClass1(k,o).click();break;case 2:geByClass1(C,o).click();break;default:debugLog("Wrong step in _addBoxHotKeys")}}})},isBadPassword:function(e){var o=this._checkPasswordStrength(e);return[N,E].includes(o)},submitPhone:function(){if(!buttonLocked(geByClass1(y))){var e=val(geByClass1(b));Login._hideFormMessageBox(),ajax.post("/al_login.php",{act:a,phone:e,hash:cur.blockedHash,sure:1},{onDone:function(e,o,n,t){if(o)return void showFastBox(e,o,n,Login.submitPhone.pbind(1),t);var s=geByClass1(b);addClass(s,P),Login.updateUnblockFormState()},onFail:function(e){return Login._showFormMessageBox(e,!0),Login.updateUnblockFormState(),!0},showProgress:lockButton.pbind(geByClass1(y)),hideProgress:unlockButton.pbind(geByClass1(y))})}},submitValidationCode:function(){if(!buttonLocked(geByClass1(k))){var e=geByClass1(B),o=val(e);if(o.length<4)return notaBene(e);Login._hideFormMessageBox(),ajax.post("/al_login.php",{act:i,code:o,hash:cur.blockedHash},{onDone:function(e){cur.unblockHash=e;var o=geByClass1(B);addClass(o,P),Login.updateUnblockFormState()},onFail:function(e){return Login._showFormMessageBox(e,!0),Login.updateUnblockFormState(),!0},showProgress:lockButton.pbind(geByClass1(k)),hideProgress:unlockButton.pbind(geByClass1(k))})}},submitPassword:function(){if(!buttonLocked(geByClass1(C))){var e=geByClass1(w),o=val(e);if(Login.isBadPassword(o))return void notaBene(e);Login.hideRightTooltip(F),Login._hideFormMessageBox(),ajax.post("/al_login.php",{act:l,pass:o,hash:cur.unblockHash,new_pass_hash:cur.newPassHash},{onDone:function(e,n,t){return e===!1&&n?(hide(geByClass1("inputs",curBox().bodyNode)),void Login._showFormMessageBox(n)):void Login.refreshAuthDataAndRedirectToFeed(n,t,e,o)},onFail:function(e){return Login._showFormMessageBox(e,!0),Login.updateUnblockFormState(),!0},showProgress:lockButton.pbind(geByClass1(C)),hideProgress:unlockButton.pbind(geByClass1(C))})}},refreshAuthDataAndRedirectToFeed:function(e,o,n,t){var s='          <form id="login_block_auth_form" target="login_block_auth_frame" action="" method="POST">            <input type="hidden" name="_origin" id="login_server_origin" />            <input type="hidden" name="email" id="login_block_email" />            <input type="hidden" name="pass" id="login_block_pass" />          </form>          <iframe name="login_block_auth_frame" id="login_block_auth_frame"></iframe>',r=utilsNode.appendChild(ce("div",{innerHTML:s})),a=window.onLoginDone,i=ge("login_block_auth_form");i.action="https://login.vk.com/?act=login&ip_h="+o+"&lg_h="+e+"&redirect=1&role=al_frame",val("login_block_email",winToUtf(n)),val("login_block_pass",winToUtf(t)),val("login_server_origin",cur.serverOrigin),i.submit(),lockButton(geByClass1(C)),cur.destroy.push(function(){re(r),window.onLoginDone=a}),window.onLoginDone=function(){re(r),unlockButton(geByClass1(C)),nav.go("/feed",!0)}},changePhone:function(){var e=geByClass1(b);removeClass(e,P),Login.updateUnblockFormState()},resendCode:function(){Login._hideFormMessageBox(),ajax.post("/al_login.php",{act:t,hash:cur.blockedHash},{onDone:function(e,o,n,t){o&&n?showFastBox({title:e,width:460,noCloseButton:!0},o,n,Login.callToSpellCode,t).changed=!0:o?showFastBox({title:e,width:460},o):Login._showFormMessageBox(e,!1)},onFail:function(e){return showDoneBox(e),!0}})},callToSpellCode:function(){ajax.post("/al_login.php",{act:c,hash:cur.blockedHash},{onDone:function(e){curBox().hide(),Login._showFormMessageBox(e,!1)},progress:curBox().progress})},_checkPasswordStrength:function(e){var o=j,n=["qwerty","йцукен","gfhjkm","пароль","password","abc123","fuckyou","123abc","baseball","football","soccer","monkey","liverpool","princess","jordan","slipknot","superman","iloveyou"];if(e.length<6)o=E;else if(/\s/.test(e))o=N;else if(e.match(/^\d+$/)||n.indexOf(e)>=0||e.substr(-1).match(/\d/)&&n.indexOf(e.substr(0,e.length-1))>=0)o=S;else{for(var t=[/[^a-z]/g,/[^A-Z]/g,/[^а-яё]/g,/[^А-ЯЁ]/g,/[^0-9]/g,/[a-zA-Zа-яА-ЯёЁ0-9]/g],s=[],r=0,a=0,i=t.length;i>a;++a){var l=e.replace(t[a],"").length;l&&(l>1&&r++,s.push({group:a,cnt:l}))}if(s.length<3&&s[s.length-1].group!=t.length-1&&2>r&&(o=H),(r>2||s.length>2&&s[s.length-1].group==t.length-1)&&(o=U),0>o&&r>1){var c=e.replace(t[t.length-1],"");c.length>1&&c.replace(new RegExp(escapeRE(c.charAt(0)),"g"),"").length&&(o=U)}0>o&&(o=A),o&&3>o&&e.length>13&&o++}return o},updatePasswordStrengthLabel:function(){var e=geByClass1(w),o=val(e),n=this._checkPasswordStrength(o);ge(M).className="blocked_pwd_level"+n,val(geByClass1(D),o?cur.passwordLevelLabels[n]:"&nbsp;")},_showRightTooltip:function(e,o,n,t){var s=geByClass1(e),r=function(){showTooltip(s,{dir:"left",width:245,text:o,slideX:15,className:"login_blocked_tt"+(t?" "+t:""),shift:n,forcetoup:!0,onCreate:removeEvent.pbind(s,"mouseout")})};vk.loaded?setTimeout(r,0):addEvent(window,"load",r)},hideRightTooltip:function(e){var o=geByClass1(e);o&&o.tt&&o.tt.hide&&o.tt.hide()},showPhoneTooltip:function(){hasClass(geByClass1(b),P)||Login._showRightTooltip(T,cur.phoneTooltip,[-210,-88,3])},showVerificationCodeTooltip:function(){hasClass(geByClass1(B),P)||Login._showRightTooltip(R,cur.verificationCodeTooltip,[-210,-71,3])},showPasswordTooltip:function(){cur.isEmailPass||Login._showRightTooltip(F,cur.passwordTooltip,[-210,-63,3])},showDeletePageBox:function(){showFastBox(getLang("login_blocked_delete_page_header"),getLang("login_blocked_sure_delete_page_question"),getLang("box_yes"),Login.onDeleteYes,getLang("box_no"))},onDeleteYes:function(){ajax.post("al_settings.php",{act:g,hash:cur.deactivate_hash},{onDone:function(e){showDoneBox(e),nav.go("/id"+vk.id)},onFail:function(e){showDoneBox(e),curBox().hideProgress()}})}};try{stManager.done(jsc("web/login.js"))}catch(O){console.log(O)}},539:function(e,o,n){e.exports=n(368)}});