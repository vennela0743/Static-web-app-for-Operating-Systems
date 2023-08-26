var res,pro;
function BuildFormFields($amount) // For Blocks
        {
            
            res = $amount;
            if(res<0)
                alert("Invalid Inputs");
            var
                $container = document.getElementById('FormFields'),
                $item, $field, $i;
            $container.innerHTML = '';
            for ($i = 0; $i < $amount; $i++) {
                $item = document.createElement('div');
                $item.style.margin = '10px';
            
                $field = document.createElement('label');
                $field.innerHTML = 'Size of block '+$i;
                $item.appendChild($field);
                $field = document.createElement('input');
                $field.name = 'Design[' + $i + ']';
                $field.type = 'text';
                $field.setAttribute("class","form-control");
                $item.appendChild($field);
                $container.appendChild($item);
            }
        }
        function BuildFormFields2($amount) //For Processes
        {
            pro = $amount;
            if($amount<0)
                alert("Invalid Inputs");
            console.log(res);
            var
                $container = document.getElementById('FormFields1'),
                $item, $field, $i;
            $container.innerHTML = '';
            for ($i = 0; $i < $amount; $i++) {
                // for($j = 0; $j < res; $j++)
                // {
                    $item = document.createElement('div');
                    $item.style.margin = '10px';
                    $field = document.createElement('label');
                    $field.innerHTML = 'Size of process '+$i;
                    $item.appendChild($field);
                    $field = document.createElement('input');
                    $field.name = 'Design[' + $i + ']';
                    $field.type = 'text';
                    $field.setAttribute("class","form-control");
                    $item.appendChild($field);
                    $container.appendChild($item);
                // }
            }
        }

    

    function firstFit() {
        var block_form = document.block_no;
        var process_form = document.process_no;
        var block_size = [];
        var process_size = [];
        for(var i = 1; i <= res; i++){
            block_size[i-1] = Number(block_form[i].value);
        }
        for(var i = 1; i <= pro; i++){
            process_size[i-1] = Number(process_form[i].value);
        }
        
        console.log(block_size);
        console.log(process_size);
        console.log(res);
        console.log(pro);

   
        var allocation = [];
        for(i = 0; i < pro; i++)
        {
            allocation[i] = -1;
        }
        console.log(allocation);

        var exFrag;
        var inFrag;

        for(var i = 0; i < pro; i++){
            for(var j = 0; j < res; j++){
                if(block_size[j] >= process_size[i])
                {
                    allocation[i] = j;
                    block_size[j] -= process_size[i];
                    // inFrag += block_size[j];
                    break;
                }
                console.log(allocation);
            }
        }
        
        console.log(allocation);

        // var bNo = allocation.filter((v, i, a) => a.indexOf(v) === i);
        // var total_block_size = block_size.reduce((a, b) => a + b, 0);
        // for(var i = 0; i < bNo.length; i++){
        //     if(bNo[i] != -1){
        //         exFrag += bNo[i];
        //     }
        // }
        // exFrag = total_block_size - exFrag;
        // console.log(exFrag);
        // console.log(inFrag);

        for(var i = 0; i < pro; i++){
            if(allocation[i] != -1){
                allocation[i] += 1;
                $('#tblResults > tbody:last-child').append(
                    `<tr>
                        <td id="tdProcessNo">${i+1}</td>
                        <td id="tdProcessSize">${process_size[i]}</td>
                        
                        <td id="tdBlockNo">${allocation[i]}</td>
                    </tr>`
                );
            }
            else{
                $('#tblResults > tbody:last-child').append(
                    `<tr>
                        <td id="tdProcessNo">${i+1}</td>
                        <td id="tdProcessSize">${process_size[i]}</td>
                        
                        <td id="tdBlockNo">${-1}</td>
                    </tr>`
                );
            }
        }
       
    }

    function bestFit() {
        var block_form = document.block_no;
        var process_form = document.process_no;
        var block_size = [];
        var process_size = [];
        for(var i = 1; i <= res; i++){
            block_size[i-1] = Number(block_form[i].value);
        }
        for(var i = 1; i <= pro; i++){
            process_size[i-1] = Number(process_form[i].value);
        }

        var allocation = [];
        for(i = 0; i < pro; i++)
        {
            allocation[i] = -1;
        }
        console.log(allocation);

        for(var i = 0; i < pro; i++){
            var bestIdx = -1;
            for(var j = 0; j < res; j++){
                if(block_size[j] >= process_size[i]){
                    if(bestIdx == -1){
                        bestIdx = j;
                    }
                    else if(block_size[bestIdx] > block_size[j])
                        bestIdx = j;
                }
            }
            if(bestIdx != -1){
                allocation[i] = bestIdx;
                block_size[bestIdx] -= process_size[i]; 
            }
        }
        console.log(allocation);
        for(var i = 0; i < pro; i++){
            if(allocation[i] != -1){
                allocation[i] += 1;
                $('#tblResults > tbody:last-child').append(
                    `<tr>
                        <td id="tdProcessNo">${i+1}</td>
                        <td id="tdProcessSize">${process_size[i]}</td>
                        <td id="tdBlockNo">${allocation[i]}</td>
                    </tr>`
                );
            }
            else{
                $('#tblResults > tbody:last-child').append(
                    `<tr>
                        <td id="tdProcessNo">${i+1}</td>
                        <td id="tdProcessSize">${process_size[i]}</td>
                        <td id="tdBlockNo">${-1}</td>
                    </tr>`
                );
            }
        }
    }

    function worstFit() {
        var block_form = document.block_no;
        var process_form = document.process_no;
        var block_size = [];
        var process_size = [];
        for(var i = 1; i <= res; i++){
            block_size[i-1] = Number(block_form[i].value);
        }
        for(var i = 1; i <= pro; i++){
            process_size[i-1] = Number(process_form[i].value);
        }

        var allocation = [];
        for(i = 0; i < pro; i++)
        {
            allocation[i] = -1;
        }
        console.log(allocation);

        for(var i = 0; i < pro; i++){
            var worstIdx = -1;
            for(var j = 0; j < res; j++){
                if(block_size[j] >= process_size[i]){
                    if(worstIdx == -1){
                        worstIdx = j;
                    }
                    else if (block_size[worstIdx] < block_size[j])
                        worstIdx = j;
                }
            }
            if(worstIdx != -1){
                allocation[i] = worstIdx;
                block_size[worstIdx] -= process_size[i];
            }
        }

        console.log(allocation);
        for(var i = 0; i < pro; i++){
            if(allocation[i] != -1){
                allocation[i] += 1;
                $('#tblResults > tbody:last-child').append(
                    `<tr>
                        <td id="tdProcessNo">${i+1}</td>
                        <td id="tdProcessSize">${process_size[i]}</td>
                        <td id="tdBlockNo">${allocation[i]}</td>
                    </tr>`
                );
            }
            else{
                $('#tblResults > tbody:last-child').append(
                    `<tr>
                        <td id="tdProcessNo">${i+1}</td>
                        <td id="tdProcessSize">${process_size[i]}</td>
                        <td id="tdBlockNo">${-1}</td>
                    </tr>`
                );
            }
        }
    }