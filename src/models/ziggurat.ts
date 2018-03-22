export class Ziggurat {

  jsr = 123456789;

  wn = Array(128);
  fn = Array(128);
  kn = Array(128);

  RNOR() {
    let hz = this.SHR3();
    let iz = hz & 127;
    return (Math.abs(hz) < this.kn[iz]) ? hz * this.wn[iz] : this.nfix(hz, iz);
  }

  nextGaussian() {
    return this.RNOR();
  }

  nfix(hz, iz) {
    let r = 3.442619855899;
    let r1 = 1.0 / r;
    let x;
    let y;
    while (true) {
      x = hz * this.wn[iz];
      if (iz == 0) {
        x = (-Math.log(this.UNI()) * r1);
        y = -Math.log(this.UNI());
        while (y + y < x * x) {
          x = (-Math.log(this.UNI()) * r1);
          y = -Math.log(this.UNI());
        }
        return (hz > 0) ? r + x : -r - x;
      }

      if (this.fn[iz] + this.UNI() * (this.fn[iz - 1] - this.fn[iz]) < Math.exp(-0.5 * x * x)) {
        return x;
      }
      hz = this.SHR3();
      iz = hz & 127;

      if (Math.abs(hz) < this.kn[iz]) {
        return (hz * this.wn[iz]);
      }
    }
  }

  SHR3() {
    let jz = this.jsr;
    let jzr = this.jsr;
    jzr ^= (jzr << 13);
    jzr ^= (jzr >>> 17);
    jzr ^= (jzr << 5);
    this.jsr = jzr;
    return (jz + jzr) | 0;
  }


  UNI() {
    return 0.5 * (1 + this.SHR3() / -Math.pow(2, 31));
  }

  zigset() {
    // seed generator based on current time
    this.jsr ^= new Date().getTime() ** Math.random();

    let m1 = 2147483648.0;
    let dn = 3.442619855899;
    let tn = dn;
    let vn = 9.91256303526217e-3;

    let q = vn / Math.exp(-0.5 * dn * dn);
    this.kn[0] = Math.floor((dn / q) * m1);
    this.kn[1] = 0;

    this.wn[0] = q / m1;
    this.wn[127] = dn / m1;

    this.fn[0] = 1.0;
    this.fn[127] = Math.exp(-0.5 * dn * dn);

    for (let i = 126; i >= 1; i--) {
      dn = Math.sqrt(-2.0 * Math.log(vn / dn + Math.exp(-0.5 * dn * dn)));
      this.kn[i + 1] = Math.floor((dn / tn) * m1);
      tn = dn;
      this.fn[i] = Math.exp(-0.5 * dn * dn);
      this.wn[i] = dn / m1;
    }
  }

  getZPercent(z) {
    //z == number of standard deviations from the mean

    //if z is greater than 6.5 standard deviations from the mean
    //the number of significant digits will be outside of a reasonable
    //range
    if (z < -6.5)
      return 0.0;
    if (z > 6.5)
      return 1.0;

    let factK = 1;
    let sum = 0;
    let term = 1;
    let k = 0;
    let loopStop = Math.exp(-23);
    while (Math.abs(term) > loopStop) {
      term = .3989422804 * Math.pow(-1, k) * Math.pow(z, k) / (2 * k + 1) / Math.pow(2, k) * Math.pow(z, k + 1) / factK;
      sum += term;
      k++;
      factK *= k;

    }
    sum += 0.5;

    return sum;
  }

  constructor() {
    this.zigset();
  }

  getRandom() {
    return Math.round((this.getZPercent(this.nextGaussian())) * 100);
  }
}
