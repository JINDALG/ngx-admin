import {Component, Inject} from "@angular/core";
import {Router} from "@angular/router";
import {NB_AUTH_OPTIONS} from "@nebular/auth/auth.options";
import {getDeepFromObject} from "@nebular/auth/helpers";
import {NbAuthService} from "@nebular/auth/services/auth.service";

var DaRegisterComponent = /** @class */ (function () {
  function DaRegisterComponent(service, options, router) {
    if (options === void 0) { options = {}; }
    this.service = service;
    this.options = options;
    this.router = router;
    this.redirectDelay = 0;
    this.showMessages = {};
    this.strategy = '';
    this.submitted = false;
    this.errors = [];
    this.messages = [];
    this.user = {};
    this.socialLinks = [];
    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.strategy = this.getConfigValue('forms.register.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
  }
  DaRegisterComponent.prototype.register = function () {
    var _this = this;
    this.errors = this.messages = [];
    this.submitted = true;
    this.service.register(this.strategy, this.user).subscribe(function (result) {
      _this.submitted = false;
      if (result.isSuccess()) {
        _this.messages = result.getMessages();
      }
      else {
        _this.errors = result.getErrors();
      }
      var redirect = result.getRedirect();
      if (redirect) {
        setTimeout(function () {
          return _this.router.navigateByUrl(redirect);
        }, _this.redirectDelay);
      }
    });
  };
  DaRegisterComponent.prototype.getConfigValue = function (key) {
    return getDeepFromObject(this.options, key, null);
  };
  DaRegisterComponent.decorators = [
    { type: Component, args: [{
      selector: 'da-register',
      styles: [":host .title{margin-bottom:2rem} "],
      template: "\n" +
      "    <da-auth-block>\n" +
      "      <h2 class=\"title\">Sign Up</h2>\n" +
      "      <form (ngSubmit)=\"register()\" #form=\"ngForm\">\n\n" +
      "        <div *ngIf=\"showMessages.error && errors && errors.length > 0 && !submitted\"\n             class=\"alert alert-danger\" role=\"alert\">\n" +
      "          <div><strong>Oh snap!</strong></div>\n" +
      "          <div *ngFor=\"let error of errors\">{{ error }}</div>\n" +
      "        </div>\n" +
      "        <div *ngIf=\"showMessages.success && messages && messages.length > 0 && !submitted\"\n             class=\"alert alert-success\" role=\"alert\">\n" +
      "          <div><strong>Hooray!</strong></div>\n" +
      "          <div *ngFor=\"let message of messages\">{{ message }}</div>\n" +
      "        </div>\n\n" +
      "        <div class=\"form-group\">\n" +
      "          <label for=\"input-name\" class=\"sr-only\">Full name</label>\n" +
      "          <input name=\"fullName\" [(ngModel)]=\"user.fullName\" id=\"input-name\" #fullName=\"ngModel\"\n                 class=\"form-control\" placeholder=\"Full name\"\n                 [class.form-control-danger]=\"fullName.invalid && fullName.touched\"\n                 [required]=\"getConfigValue('forms.validation.fullName.required')\"\n                 [minlength]=\"getConfigValue('forms.validation.fullName.minLength')\"\n                 [maxlength]=\"getConfigValue('forms.validation.fullName.maxLength')\"\n                 autofocus>\n" +
      "          <small class=\"form-text error\" *ngIf=\"fullName.invalid && fullName.touched && fullName.errors?.required\">\n            Full name is required!\n          </small>\n          <small\n            class=\"form-text error\"\n            *ngIf=\"fullName.invalid && fullName.touched && (fullName.errors?.minlength || fullName.errors?.maxlength)\">\n            Full name should contains\n            from {{getConfigValue('forms.validation.fullName.minLength')}}\n            to {{getConfigValue('forms.validation.fullName.maxLength')}}\n            characters\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-email\" class=\"sr-only\">Email address</label>\n          <input name=\"email\" [(ngModel)]=\"user.email\" id=\"input-email\" #email=\"ngModel\"\n                 class=\"form-control\" placeholder=\"Email address\" pattern=\".+@.+..+\"\n                 [class.form-control-danger]=\"email.invalid && email.touched\"\n                 [required]=\"getConfigValue('forms.validation.email.required')\">\n          <small class=\"form-text error\" *ngIf=\"email.invalid && email.touched && email.errors?.required\">\n            Email is required!\n          </small>\n          <small class=\"form-text error\"\n                 *ngIf=\"email.invalid && email.touched && email.errors?.pattern\">\n            Email should be the real one!\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-password\" class=\"sr-only\">Password</label>\n          <input name=\"password\" [(ngModel)]=\"user.password\" type=\"password\" id=\"input-password\"\n                 class=\"form-control\" placeholder=\"Password\" #password=\"ngModel\"\n                 [class.form-control-danger]=\"password.invalid && password.touched\"\n                 [required]=\"getConfigValue('forms.validation.password.required')\"\n                 [minlength]=\"getConfigValue('forms.validation.password.minLength')\"\n                 [maxlength]=\"getConfigValue('forms.validation.password.maxLength')\">\n          <small class=\"form-text error\" *ngIf=\"password.invalid && password.touched && password.errors?.required\">\n" +
      "            Password is required!\n" +
      "          </small>\n" +
      "          <small\n            class=\"form-text error\"\n            *ngIf=\"password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)\">\n" +
      "            Password should contains\n            from {{ getConfigValue('forms.validation.password.minLength') }}\n            to {{ getConfigValue('forms.validation.password.maxLength') }}\n            characters\n" +
      "          </small>\n" +
      "        </div>\n\n" +
      "        <div class=\"form-group\">\n" +
      "          <label for=\"input-re-password\" class=\"sr-only\">Repeat password</label>\n" +
      "          <input\n            name=\"rePass\" [(ngModel)]=\"user.confirmPassword\" type=\"password\" id=\"input-re-password\"\n            class=\"form-control\" placeholder=\"Confirm Password\" #rePass=\"ngModel\"\n            [class.form-control-danger]=\"(rePass.invalid || password.value != rePass.value) && rePass.touched\"\n            [required]=\"getConfigValue('forms.validation.password.required')\">\n" +
      "          <small class=\"form-text error\"\n                 *ngIf=\"rePass.invalid && rePass.touched && rePass.errors?.required\">\n" +
      "            Password confirmation is required!\n" +
      "          </small>\n" +
      "          <small\n" +
      "            class=\"form-text error\"\n" +
      "            *ngIf=\"rePass.touched && password.value != rePass.value && !rePass.errors?.required\">\n" +
      "            Password does not match the confirm password.\n" +
      "          </small>\n" +
      "        </div>\n\n" +
      "        <button [disabled]=\"submitted || !form.valid\" class=\"btn btn-block btn-hero-success\"\n                [class.btn-pulse]=\"submitted\">\n" +
      "          Register\n        </button>\n " +
      "     </form>\n\n" +
      "      <div class=\"links\">\n\n" +
      "        <small class=\"form-text\">\n" +
      "          Already have an account? <a routerLink=\"../login\"><strong>Sign in</strong></a>\n" +
      "        </small>\n" +
      "      </div>\n" +
      "    </da-auth-block>\n  ",
    },] },
  ];
  /** @nocollapse */
  DaRegisterComponent.ctorParameters = function () { return [
    { type: NbAuthService, },
    { type: undefined, decorators: [{ type: Inject, args: [NB_AUTH_OPTIONS,] },] },
    { type: Router, },
  ]; };
  return DaRegisterComponent;
}());
export { DaRegisterComponent };
//# sourceMappingURL=register.component.js.map
