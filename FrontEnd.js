/**
 * Created by alex on 20.2.17.
 */
$(document).ready(function(){

    $('#start').click(function() {
        p=$('#p').val();
        maxElInPipeline=$('#r').val();
        var A= new Array();
        var B= new Array();
        var m=$('#m').val();
        for(var i=1;i<=m;i++){
            A.push(i);
            B.push(i);
        }
        createPipeline();
        for(var i =0;i<m;i++)
            for(var j =0;j<m;j++)
                addToPipeline(A[i],B[j]);

        // addToPipeline(1,2);
        // addToPipeline(1,3);
        // addToPipeline(1,4);
        // addToPipeline(1,5);
        // addToPipeline(1,6);
        // addToPipeline(1,7);
        // addToPipeline(1,8);
        // addToPipeline(1,9);
        // addToPipeline(1,10);
        // addToPipeline(1,11);
        // addToPipeline(1,12);
        // addToPipeline(1,13);
        // addToPipeline(1,14);
        // addToPipeline(1,15);
        // addToPipeline(1,16);
        // addToPipeline(1,17);
        // addToPipeline(1,18);
        // addToPipeline(1,19);
        startPipeline();
    });
});