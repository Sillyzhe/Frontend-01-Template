export class Timeline {
  constructor() {
    this.animations = [];
    this.requestId = null;
    this.state = "inited";
    this.tick = () => {
      let t = Date.now() - this.startTime;
      let animations = this.animations.filter(
        (animation) => !animation.finished
      );
      for (let animation of this.animations) {
        let {
          object,
          property,
          template,
          start,
          end,
          timingFunction,
          duration,
          delay,
          startTime,
        } = animation;

        let progression = timingFunction((t - delay - startTime) / duration); //0-1之间的数
        if (t > duration + delay + startTime) {
          progression = 1;
          animation.finished = true;
        }
        let value = start + progression * (end - start); //value就是根据progression算出的当前值

        object[property] = template(value);
      }
      if (animations.length) {
        this.requestId = requestAnimationFrame(this.tick);
      }
    };
  }

  resume() {
    if (this.state !== "paused") return;
    this.state = "playing";
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  pause() {
    if (this.state !== "playing") return;
    this.state = "paused";
    this.pauseTime = Date.now();
    if (this.requestId != null) {
      cancelAnimationFrame(this.requestId);
    }
  }

  start() {
    if (this.state !== "inited") return;
    this.state = "playing";
    this.startTime = Date.now();
    this.tick();
  }
  restart() {
    if (this.state === "playing") {
      this.pause();
    }
    this.animations = [];
    this.requestId = null;
    this.start = "palying";
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }

  add(animation, addTime) {
    this.animations.push(animation);
    animation.finished = false;
    if (this.state === "playing") {
      animation.startTime =
        addTime != void 0 ? addTime : Date.now() - this.startTime;
    } else {
      animation.startTime = addTime != void 0 ? addTime : 0;
    }
  }
}

export class Animation {
  constructor(
    object,
    property,
    template,
    start,
    end,
    duration,
    delay,
    timingFunction
  ) {
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFunction = timingFunction;
  }
}
