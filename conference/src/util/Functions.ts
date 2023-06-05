//string of type "{0} text {1} ..."
export function format(str: string, ...params: any[]) {
    return str.replace(/{([0-9]+)}/g, function (match, index) {
        return typeof params[index] == 'undefined' ? match : params[index];
    });
};