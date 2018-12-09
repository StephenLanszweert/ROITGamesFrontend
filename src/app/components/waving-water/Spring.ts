export class Spring {
    public p = 0;
    public v = 0;

    update(damp, tens) {
        this.v += (-tens * this.p - damp * this.v);
        this.p += this.v;
    }
}
