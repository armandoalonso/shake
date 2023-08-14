function getInstanceJs(parentClass, scriptInterface, addonTriggers, C3) {
  return class extends parentClass {
    constructor(inst, properties) {
      super(inst);

      if (properties) {
        this.enabled = properties[0] !== 0;
        this.duration = properties[1];
        this.magnitude = properties[2];
        this.magnitudeMode = properties[3];
        this.shakeAxis = properties[4];
      }

      this.isShaking = false;
      this.originX = 0;
      this.originY = 0;
      this.remainingDuration = 0;
      this.isEnded = false;
    }

    Tick() {
      this._BackToOrigin(false);
    }

    Tick2() {
      this._Shake();
    }

    _SetEnabled(value) {
      this.enabled = value;
    }

    _SetDuration(value) {
      this.duration = value;
    }

    _SetMagnitude(value) {
      this.magnitude = value;
    }

    _SetMagnitudeMode(value) {
      this.magnitudeMode = value;
    }

    _Shake() {
      if (!this.enabled || !this.isShaking) {
        return;
      }

      const dt = this.GetRuntime().GetDt(this.inst);
      if(dt == 0){
        return;
      }

      this.isEnded = this._ShakePosition(dt);
      if (this.isEnded) {
        this.originX = null;
        this.originY = null;
        this.isShaking = false;
        this.Trigger(C3.Behaviors.piranha305_shake.Cnds.OnShakeEnd);
        this.isEnded = false;
      }
    }

    _ShakePosition(dt) {
      const wi = this._inst.GetWorldInfo();
      const is_ended = this.remainingDuration <= dt;
      let offsetX, offsetY;
      
      if (is_ended) {
        offsetX = 0;
        offsetY = 0;
      } else {
        let magnitue = this._GetMagnitude() * Math.min(this.GetRuntime().GetTimeScale(), 1);

        //decay
        if (this.magnitudeMode === 1) { 
          magnitue *= this.remainingDuration / this.duration;
        }

        const angle = Math.random() * 2 * Math.PI;
        offsetX = Math.cos(angle) * magnitue;
        offsetY = Math.sin(angle) * magnitue;
      }

      const newX = this.originX + offsetX;
      const newY = this.originY + offsetY;

      //XY
      if(this.shakeAxis === 0){
        if(newX !== wi.GetX() || newY !== wi.GetY()){
          wi.SetX(newX);
          wi.SetY(newY);
        }
      }

      //X
      else if(this.shakeAxis === 1){
        if(newX !== wi.GetX()){
          wi.SetX(newX);
        }
      }

      //Y
      else if(this.shakeAxis === 2){
        if(newY !== wi.GetY()){
          wi.SetY(newY);
        }
      }

      wi.SetBboxChanged();

      this.remainingDuration -= dt;
      return is_ended;
    }

    _StartShake() {
      this.isShaking = true;
      this.remainingDuration = this.duration;
      const wi = this._inst.GetWorldInfo();

      this.originX = wi.GetX();
      this.originY = wi.GetY();

      if(this.enabled){
        this._StartTicking();
        this._StartTicking2();
      }
    }

    _StopShake() {
      this._BackToOrigin(true);
      this._StopTicking();
      this._StopTicking2();

      this.isShaking = false;
      this.isEnded = true;
      this.remainingDuration = 0;

      const wi = this._inst.GetWorldInfo();
      wi.SetX(this.originX);
      wi.SetY(this.originY);

      this.Trigger(C3.Behaviors.piranha305_shake.Cnds.OnShakeEnd);
    }

    _StartShakeWithParams(duration, magnitude, magnitudeMode) {
      this.duration = duration;
      this.magnitude = magnitude;
      this.magnitudeMode = magnitudeMode;
      this._StartShake();
    }

    _OnShakeEnd() {
      return this.isEnded;
    }

    _IsShaking(){
      return this.isShaking;
    }

    _GetDuration() {
      return this.duration;
    }

    _GetMagnitude() {
      return this.magnitude;
    }

    _GetRemainingDuration() {
      return this.remainingDuration;
    }

    _GetOriginX() {
      return this.originX;
    }

    _GetOriginY() {
      return this.originY;
    }

    _BackToOrigin(updatBBox) {
      if(!this.enabled || !this.isShaking){
        return;
      }

      if (this.originX !== null && this.originY !== null) {
        const wi = this._inst.GetWorldInfo();
        if(wi.GetX() !== this.originX || wi.GetY() !== this.originY){
          wi.SetX(this.originX);
          wi.SetY(this.originY);
          if(updatBBox){
            wi.SetBboxChanged();
          }
        }
      }
    }

    _SetShakeAxis(axis){
      this.shakeAxis = axis;
    }

    Release() {
      super.Release();
    }

    SaveToJson() {
      return {
        enabled: this.enabled,
        duration: this.duration,
        magnitude: this.magnitude,
        magnitudeMode: this.magnitudeMode,
        isShaking: this.isShaking,
        originX: this.originX,
        originY: this.originY,
        remainingDuration: this.remainingDuration,
      };
    }

    LoadFromJson(o) {
      this.enabled = o.enabled;
      this.duration = o.duration;
      this.magnitude = o.magnitude;
      this.magnitudeMode = o.magnitudeMode;
      this.isShaking = o.isShaking;
      this.originX = o.originX;
      this.originY = o.originY;
      this.remainingDuration = o.remainingDuration;
    }

    GetDebuggerProperties() {
      return [
        {
          title: "$" + this.GetBehaviorType().GetName(),
          properties: [
            {
              name: "Enabled",
              value: this.enabled,
              onedit: (v) => this._SetEnabled(v),
            },
            {
              name: "Duration",
              value: this.duration,
              onedit: (v) => this._SetDuration(v),
            },
            {
              name: "Remaining Duration",
              value: this.remainingDuration,
            },
            {
              name: "Magnitude",
              value: this.magnitude,
              onedit: (v) => this._SetMagnitude(v),
            },
            {
              name: "Origin X",
              value: this.originX,
            },
            {
              name: "Origin Y",
              value: this.originY,
            },

            {
              name: "Is Shaking",
              value: this.isShaking,
            }
          ],
        },
      ];
    }

    Trigger(method) {
      super.Trigger(method);
      const addonTrigger = addonTriggers.find((x) => x.method === method);
      if (addonTrigger) {
        this.GetScriptInterface().dispatchEvent(new C3.Event(addonTrigger.id));
      }
    }

    GetScriptInterfaceClass() {
      return scriptInterface;
    }
  };
}
