const proxyurl = "https://cors-anywhere.herokuapp.com/"; // work around for CORS
const wiki = "https://en.wikipedia.org"; // Wikipedia links start with /wiki/a...

// Finds and parses all the links from a given url
async function getLinks(s) {
    
    //initial
    var search;
    if (arguments.length == 0) {
        search = document.getElementById("search").value;
    } else {
        search = s;
    }
    
    // gets full text from response
    const response = await fetch(proxyurl + search);
    const text = await response.text();
    
    // parsing links and information
    var raw_links = String(text).match(/\/wiki\/[^\s\":%]+/g);
    var full_links = [];
    var page_titles = [];
    var linksLength = raw_links.length;
    for (var i = 0; i < linksLength; i++){
        full_link = wiki + raw_links[i];
        if (full_links.includes(full_link) == false) {
            full_links.push(full_link);
            page_titles.push(full_link.substring(30));
        }
    }
    removeTable(); // removes possibly existing table
    createTable(page_titles, full_links); // create new table and append it
}

// generates table of links
async function createTable(page_titles, full_links) {
    var t = document.createElement("TABLE");
    t.setAttribute("id", "results_table");
    document.getElementById("table_container").appendChild(t);
    var table_rows = page_titles.length;
    for (var i = 0; i < table_rows; i++) {
        var t_r = document.createElement("TR");
        t_r.setAttribute("id","table_row_" + i);
        document.getElementById("results_table").appendChild(t_r);
        
        var t_d_1 = document.createElement("TD");
        var t_d_t_1 = document.createTextNode(""+i);
        t_d_1.appendChild(t_d_t_1);
        
        var t_d_2 = document.createElement("TD");
        var link = document.createElement("a");
        link.setAttribute("href", "#");
        link.setAttribute("onclick","getLinks(\"" + full_links[i] + "\")");
        var link_text = document.createTextNode(page_titles[i]);
        link.append(link_text);
        t_d_2.appendChild(link);
        
        document.getElementById("table_row_" + i).appendChild(t_d_1);
        document.getElementById("table_row_" + i).appendChild(t_d_2);
    }
}

// removes existing table
async function removeTable() {
    var t = document.getElementById("results_table");
    if (t) t.parentNode.removeChild(t);
}