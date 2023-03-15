import FileSaver from 'file-saver';

export const writeFile = (data) => {
    const blob = new Blob([JSON.stringify(data)], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "data.json");
}

export function readTextFile(file)
{
    const rawFile = new XMLHttpRequest();
    let fileData;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                fileData = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return fileData;
}

