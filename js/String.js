String.prototype.ucfirst = function () {
    return this[0].toUpperCase() + this.slice(1);
};
String.prototype.titleCase = function () {
    return this.toLowerCase().split(' ').map(word => word.ucfirst()).join(' ');
}