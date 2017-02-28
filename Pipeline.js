/**
 * Created by alex on 12.2.17.
 */
function PipelineObj(rez, num,index,bitnum,time,item) {
    this.rez = rez;
    this.num = num;
    this.index=index;
    this.bitnum=bitnum;
    this.time=time;
    this.item=item;
}
var p;
// var maxElInPipeline;
// var ElAtPipeline=0;
var ArrayOfPipelineElement= new Array();
var ArrayRezOfWork= new Array();


function startPipeline() {
    for(var index=0; index<ArrayOfPipelineElement.length-1; index++)
        setTimeout(ArrayOfPipelineElement[index].SumAndMove(index), 0);


}
function addToPipeline(firstNum,secondNum) {
    ArrayOfPipelineElement[0].stack.push(new PipelineObj(0,firstNum,0,secondNum,0,ArrayOfPipelineElement[0].stack.length));
}
function createPipeline() {
    var el={
        SumAndMove: function (index) {
            if(ArrayOfPipelineElement[index].stack.length==0){
                ArrayOfPipelineElement[index].work=false;
                return;
            }

            // if(ElAtPipeline>=maxElInPipeline){
            //     console.log("too much el at pipeline "+ElAtPipeline);
            //     for(var i=0;i<ArrayOfPipelineElement[index].stack.length;i++)
            //         ArrayOfPipelineElement[index].stack[i].time+=searchMaxTimeEl();
            //     setTimeout(ArrayOfPipelineElement[index+1].SumAndMove(index+1), 1);
            //     return;
            // }

            for(var i=0;i<ArrayOfPipelineElement[index].stack.length;i++)
                ArrayOfPipelineElement[index].stack[i].time++;

            ArrayOfPipelineElement[index].timeNow++;
            ArrayOfPipelineElement[index].history.push({
                rez:ArrayOfPipelineElement[index].stack[0].rez,
                time:ArrayOfPipelineElement[index].stack[0].time,
                item:ArrayOfPipelineElement[index].stack[0].item,
                num:ArrayOfPipelineElement[index].stack[0].num

            });
            if(ArrayOfPipelineElement[index].timeNow<ArrayOfPipelineElement[index].time){
                ArrayOfPipelineElement[index].SumAndMove(index);
                return;
            }


            ArrayOfPipelineElement[index].timeNow=0;
            var workObj=ArrayOfPipelineElement[index].stack.shift();
            // ElAtPipeline++;

            var DoSum=(workObj.bitnum).toString(2).charAt(workObj.index);

            if(DoSum==1){
                workObj.rez+=workObj.num;
            }
            if(workObj.index<(workObj.bitnum).toString(2).length-1)
                workObj.rez<<=1;

            ArrayOfPipelineElement[index+1].stack.push(new PipelineObj(workObj.rez,workObj.num,++workObj.index,workObj.bitnum,workObj.time+(ArrayOfPipelineElement[index+1].time-1)*workObj.item,workObj.item));
            setTimeout(ArrayOfPipelineElement[index].SumAndMove(index), 1);
        },
        stack:new Array(),
        history:new Array(),
        work:true,
        timeNow:0,
        time:1
    }
    ArrayOfPipelineElement.push(el);
    for(var i=1;i<p-1;i++){
        el={
            SumAndMove: function (index) {
                if(!ArrayOfPipelineElement[index-1].work && ArrayOfPipelineElement[index].stack.length==0){
                    setTimeout(ArrayOfPipelineElement[index+1].SumAndMove(index+1), 1);
                    ArrayOfPipelineElement[index].work=false;
                    return;
                }
                if(ArrayOfPipelineElement[index-1].work && ArrayOfPipelineElement[index].stack.length==0){
                    setTimeout(ArrayOfPipelineElement[index+1].SumAndMove(index+1), 1);
                    return;
                }

                ArrayOfPipelineElement[index].stack[0].time++;


                ArrayOfPipelineElement[index].timeNow++;
                ArrayOfPipelineElement[index].history.push({
                    rez:ArrayOfPipelineElement[index].stack[0].rez,
                    time:ArrayOfPipelineElement[index].stack[0].time,
                    item:ArrayOfPipelineElement[index].stack[0].item,
                    num:ArrayOfPipelineElement[index].stack[0].num

                });
                if(ArrayOfPipelineElement[index].timeNow<ArrayOfPipelineElement[index].time){
                    ArrayOfPipelineElement[index].SumAndMove(index);
                    return;
                }

                ArrayOfPipelineElement[index].timeNow=0;

                var workObj=ArrayOfPipelineElement[index].stack.shift();

                var DoSum=(workObj.bitnum).toString(2).charAt(workObj.index);

                if(DoSum==1){
                    workObj.rez+=workObj.num;
                }
                if(workObj.index<(workObj.bitnum).toString(2).length-1)
                    workObj.rez<<=1;

                ArrayOfPipelineElement[index+1].stack.push(new PipelineObj(workObj.rez,workObj.num,++workObj.index,workObj.bitnum,workObj.time+(ArrayOfPipelineElement[index+1].time-1)*workObj.item,workObj.item));

                setTimeout(ArrayOfPipelineElement[index].SumAndMove(index), 1);

            },
            stack:new Array(),
            history:new Array(),
            work:true,
            timeNow:0,
            time:1
        }
        ArrayOfPipelineElement.push(el);
    }
    el={
        SumAndMove: function (index) {
            if(ArrayOfPipelineElement[index].stack.length==0){
                ArrayOfPipelineElement[index].work=false;
                return;
            }

            if(ArrayOfPipelineElement[index-1].work&& ArrayOfPipelineElement[index].stack.length==0){
                setTimeout(ArrayOfPipelineElement[index].SumAndMove, 1);

                return;
            }
                ArrayOfPipelineElement[index].stack[0].time++;

            ArrayOfPipelineElement[index].timeNow++;
            ArrayOfPipelineElement[index].history.push({
                rez:ArrayOfPipelineElement[index].stack[0].rez,
                time:ArrayOfPipelineElement[index].stack[0].time,
                item:ArrayOfPipelineElement[index].stack[0].item,
                num:ArrayOfPipelineElement[index].stack[0].num

        });
            if(ArrayOfPipelineElement[index].timeNow<ArrayOfPipelineElement[index].time){
                ArrayOfPipelineElement[index].SumAndMove(index);
                return;
            }

            ArrayOfPipelineElement[index].timeNow=0;
            var workObj=ArrayOfPipelineElement[index].stack.shift();

            var DoSum=(workObj.bitnum).toString(2).charAt(workObj.index);

            if(DoSum==1){
                workObj.rez+=workObj.num;
            }
            if(workObj.index<(workObj.bitnum).toString(2).length-1)
                workObj.rez<<=1;

            // ElAtPipeline--;
            ArrayRezOfWork.push({rez:workObj.rez,time:workObj.time});

            // if(ElAtPipeline+1>=maxElInPipeline&&ArrayOfPipelineElement[0].stack.length!=0){
            //     setTimeout(ArrayOfPipelineElement[0].SumAndMove(0), 1);
            //
            // }

            setTimeout(ArrayOfPipelineElement[index].SumAndMove(index), 1);

        },
        stack:new Array(),
        history:new Array(),
        work:true,
        timeNow:0,
        time:1
    }
    ArrayOfPipelineElement.push(el);
}
// function searchMaxTimeEl() {
//     var maxTime=0;
//     var index=0;
//     for(var i=0;i<ArrayOfPipelineElement.length;i++)
//         if(ArrayOfPipelineElement[i].stack.length!=0)
//             if(ArrayOfPipelineElement[i].stack[0].time>=maxTime){
//                 maxTime=ArrayOfPipelineElement[i].stack[0].time;
//                 index=i;
//             }
//     maxTime=0;
//
//     for(var i=index+maxElInPipeline-1;i<ArrayOfPipelineElement.length;i++){
//         maxTime+=ArrayOfPipelineElement[i].time;
//     }
//     var k =index+maxElInPipeline-1;
//     console.log(k);
//     return maxTime;
//
//
// }







