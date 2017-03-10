/**
 * Created by alex on 20.2.17.
 */
$(document).ready(function(){

    $('#start').click(function() {
        p=$('#p').val();

        var arrayOfTi = $('#Ti').val().toString().split(',').map(function (x) {
            return parseInt(x, 10);
        });
        if(arrayOfTi.length!=p){
            alert("Не верно заданы Ti");
            return
        }

        var A= new Array();
        var B= new Array();
        var m=$('#m').val();
        for(var i=1;i<=m;i++){
            A.push(Math.round(Math.random() * Math.pow(2,p)));
            B.push(Math.round(Math.random() * Math.pow(2,p)));
        }
        $('#A').text("A: "+A);
        $('#B').text("B: "+B);
        createPipeline();
        for(var i=0;i<p;i++)
            ArrayOfPipelineElement[i].time=arrayOfTi[i];
        for(var i =0;i<m;i++)
            for(var j =0;j<m;j++)
                addToPipeline(A[i],B[j]);


        startPipeline();
        var content = "<table >"
        content += '<tr>';

        content += '<td></td>';
        content += '<td>To pipeline</td>';
        for(var i=0;i<ArrayOfPipelineElement.length;i++)
            content += '<td>Этап:'+(i+1)+"</td>";

        content += '<td>Result</td>';

        var count=0;

        for(var i=-1;i<ArrayOfPipelineElement[ArrayOfPipelineElement.length-1].history[ArrayOfPipelineElement[ArrayOfPipelineElement.length-1].history.length-1].time;i++){

            content += '<tr>';
            content += '<td>Time:    '+(i+1)+'</td>';

            content += '<td>';
            if(ArrayOfPipelineElement[0].history[i+1] != undefined )
                for(var j=0;j<ArrayOfPipelineElement[0].history[i+1].toPipeline.length;j++)
                    content += "("+ArrayOfPipelineElement[0].history[i+1].toPipeline[j].num+","+ArrayOfPipelineElement[0].history[i+1].toPipeline[j].bitnum+")";
            content += '</td>';

            for(var j=0;j<ArrayOfPipelineElement.length;j++){
                content += '<td>';
                for(var z=0;z<ArrayOfPipelineElement[j].history.length;z++)
                    if(ArrayOfPipelineElement[j].history[z].time==i+1)
                        content += printCorrect(ArrayOfPipelineElement[j].history[z].rez.toString(2))+"|  num:"+ArrayOfPipelineElement[j].history[z].num.toString(2)+"|  index:"+ArrayOfPipelineElement[j].history[z].item+"  " ;
                content += '</td>';
            }
            content += '<td>';
            if(count<ArrayRezOfWork.length)
                if(ArrayRezOfWork[count].time==i+1){
                    for(var j=count;j>=0;j--)
                        content +=ArrayRezOfWork[j].rez+" ";
                    count++;
                }
            else
                content +="";
            content += '</td>';


            content +='</tr>';
        }
        content += "</table>"

        $('#here_table').append(content);

        $('td').css({"border":"3px solid black"});
        $('table').css({"border":"2px solid black"});
    });
});
function printCorrect(str) {
    var res="";
    for(var i =str.length;i<2*p;i++){
        str="0".concat(str);
    }
    for(var i =0;i<str.length;i++){
        if(i%4==0&&i!=0){
            res=res.concat("-");
        }
        res=res.concat(str[i]);

    }



    return res
}