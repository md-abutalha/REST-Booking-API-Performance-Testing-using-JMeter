/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.97777777777777, "KoPercent": 0.022222222222222223};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6761666666666667, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0011666666666666668, 500, 1500, "create User"], "isController": false}, {"data": [0.8363333333333334, 500, 1500, "Total update user"], "isController": false}, {"data": [0.802, 500, 1500, "patch update user"], "isController": false}, {"data": [0.8595, 500, 1500, "delete user"], "isController": false}, {"data": [0.7903333333333333, 500, 1500, "create token "], "isController": false}, {"data": [0.7676666666666667, 500, 1500, "get user"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 18000, 4, 0.022222222222222223, 4727.600388888874, 272, 135906, 374.0, 20175.29999999999, 29763.400000000023, 43139.15000000014, 123.91659036617352, 105.82901032595227, 47.86343515074798], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["create User", 3000, 1, 0.03333333333333333, 23987.295666666665, 1369, 135906, 22575.5, 41569.6, 43507.0, 52934.70999999993, 21.317264852804286, 19.725076120399912, 9.801840756922783], "isController": false}, {"data": ["Total update user", 3000, 1, 0.03333333333333333, 755.268999999998, 279, 47784, 366.0, 1270.8000000000002, 1735.7999999999993, 7825.269999999984, 21.78538491144241, 19.57831692697176, 10.803919848845737], "isController": false}, {"data": ["patch update user", 3000, 1, 0.03333333333333333, 883.475666666665, 272, 52886, 368.0, 1477.8000000000002, 2355.2499999999973, 11697.969999999978, 21.787916421552605, 19.580818928343174, 6.677386435024802], "isController": false}, {"data": ["delete user", 3000, 1, 0.03333333333333333, 684.529666666665, 295, 48088, 362.0, 1194.0, 1756.9499999999998, 5020.209999999895, 21.612898577871274, 15.900283038917625, 6.476003941652378], "isController": false}, {"data": ["create token ", 3000, 0, 0.0, 925.7016666666656, 272, 36085, 366.0, 1488.8000000000002, 2610.2499999999973, 13304.08999999998, 21.792189679218968, 16.52106192432299, 6.363149134850071], "isController": false}, {"data": ["get user", 3000, 0, 0.0, 1129.3306666666713, 296, 54036, 371.0, 1809.4000000000005, 3255.599999999995, 16695.599999999948, 21.794564435629752, 19.78294458414155, 10.106108312628496], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 1, 25.0, 0.005555555555555556], "isController": false}, {"data": ["404/Not Found", 3, 75.0, 0.016666666666666666], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 18000, 4, "404/Not Found", 3, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 1, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["create User", 3000, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Total update user", 3000, 1, "404/Not Found", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["patch update user", 3000, 1, "404/Not Found", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["delete user", 3000, 1, "404/Not Found", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
