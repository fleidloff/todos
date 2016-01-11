import kc from "../components/shared/keycodes";

export default function onKeyDown(what, data, cb) {
        return e => {
            const target = e.target;

            if (e.keyCode === kc.tab) {
                e.preventDefault();
                data[what] = data[what].substring(0, target.selectionStart) + "  " + data[what].substring(target.selectionEnd);
                const pos = target.selectionStart;
                setTimeout(() => {
                    target.selectionStart = target.selectionEnd = pos + 2;
                }, 0);
            }

            if (e.keyCode === kc.cbOpen) {
                e.preventDefault();
                data[what] = data[what].substring(0, target.selectionStart) + "{}" + data[what].substring(target.selectionEnd);
                const pos = target.selectionStart;
                setTimeout(() => {
                    target.selectionStart = target.selectionEnd = pos + 1; 
                }, 0);
            }

            if (e.keyCode === kc.bOpen) {
                e.preventDefault();
                data[what] = data[what].substring(0, target.selectionStart) + "()" + data[what].substring(target.selectionEnd);
                const pos = target.selectionStart;
                setTimeout(() => {
                    target.selectionStart = target.selectionEnd = pos + 1; 
                }, 0);
            }

            if (e.keyCode === kc.s && e.ctrlKey) {
                e.preventDefault();
                this.save();
            }

            if (e.keyCode === kc.enter) {
                const lines = data[what].substring(0, target.selectionStart).split("\n");
                if (lines.length > 0) {
                    if (lines[lines.length - 1].indexOf("* ") === 0) {
                        e.preventDefault();
                        data[what] = data[what].substring(0, target.selectionStart) + "\n* " + data[what].substring(target.selectionEnd)    
                        const pos = target.selectionStart;
                        setTimeout(() => {
                            target.selectionStart = target.selectionEnd = pos + 3;
                        }, 0);
                    };
                } 
            }


            cb({data});
        }
    }