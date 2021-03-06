var MainObj={
	MainArray:new Array(0,1,2,3,4,5,6,7,8),//массив для сортировка
	path:new Array ("img/f1/","img/house/","img/solar_system/","img/the_bird/","img/the_code/","img/the_forest/"), //пути к картинкам
	history: new Array(),//история всех действий при пузырьковой сортировке
	path2:0,//задается случайно, путь к какому либо изображению
	clicking:false,//признак для активации и деактивации кнопок
		
		//метод "перемешивания" значение, на вход массив данных от 0 до 8 в любой последовательносте, возвращает случайный массив данных
	shuffle:function(array) {
	  	  var currentIndex = array.length, temporaryValue, randomIndex;
		  while (0 !== currentIndex) {
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
	 	  }
	
	  return array;
	},

//метод инициализирующий картинки на странице и значения в таблице, на вход подается массив случайных данных
	insertNumber:function(number){
		var cell=document.getElementsByClassName("setImage");		
		cell=cell[0].childNodes;
		for (var i=1,g=0;i<10;i++,g++){
			cell[i].style.border="1px solid white";
			cell[i].innerHTML=number[g];
			}
		for(var n=0;n<9;n++){
			cell=document.getElementsByClassName("set"+n);		
			cell[0].style.backgroundImage="url("+this.path[this.path2]+number[n]+".png)";
			}
	},
//алгоритм пузырьковой сортировки данных, все действия записываются в массив history в виде трех начений, первое - номер массива, второе - какое число больше от правого и третье меньшее число от левого, например последовательность 0[0] 2[1] 7[2] 6[3] 5[4] и т.д.([i]-номер массива), массивв будет иметь следующие значения [2,7,6,3,7,5 и т.д.]
	Bubble_sort:function(){
	for (var j = 0, len=this.MainArray.length - 1; j < len; j++) {
    	var i = 0;
    	while (i < len) { 
        if (this.MainArray[i] > this.MainArray[i + 1]) {
	    this.history.push(i,this.MainArray[i],this.MainArray[i+1]);		
            var c = this.MainArray[i];
            this.MainArray[i] = this.MainArray[i + 1];
            this.MainArray[i + 1] = c;
	   
        }
        i++;
	}
    }

	this.animation();// по завершению сортировки вызывается метод animation в котором визуально для пользователя отображается процесс пузырьковой сортировки
	},
	animation:function(){
	var t=0;
	var that=this;
	var interval=setInterval(function(){
	var cell=document.getElementsByClassName("setImage");
		cell=cell[0].childNodes;
		for (var g=1;g<10;g++)//цикл по всем ячейкам таблицы в которых устанавливаются значения от 0...8
		cell[g].style.border="1px solid white";
		cell[that.history[t]+1].innerHTML=that.MainArray[that.history[t+2]];
		cell[that.history[t]+2].innerHTML=that.MainArray[that.history[t+1]];
		cell[that.history[t]+1].style.border="1px solid red";//изменяем css стиль границ на красный для ячеек таблиц в которых происходит обмен значениями
		cell[that.history[t]+2].style.border="1px solid red";
		
		$(".set"+that.history[t]).fadeTo("fast", 0);//анимация, плавное угасание картинки
		$(".set"+(that.history[t]+1)).fadeTo("fast", 0);
		$(".set"+that.history[t]).fadeTo("slow", 1);
		$(".set"+(that.history[t]+1)).fadeTo("slow", 1);//анимация плавное появление картинки
		cell=document.getElementsByClassName("set"+that.history[t]);	
		cell[0].style.backgroundImage="url("+that.path[that.path2]+that.history[t+2]+".png)";//замена картинки
		cell=document.getElementsByClassName("set"+(that.history[t]+1));	
		cell[0].style.backgroundImage="url("+that.path[that.path2]+that.history[t+1]+".png)";//замена картинки

	t+=3;
	
	if(!that.clicking){//Если нажата кнопка стоп, остановка работы скрипта
		clearInterval(interval);
		$("#generate").removeAttr("disabled");
		$("#start-stop").val("Старт");
	for(var n=0;n<9;n++){
		var cell=document.getElementsByClassName("set"+n);		
		cell[0].style.backgroundImage="";
		}
		var cell=document.getElementsByClassName("setImage");		
		cell=cell[0].childNodes;
	for (var i=1,g=0;i<10;i++,g++){
		cell[i].style.border="1px solid white";
		cell[i].innerHTML=g;
		}
		}

		if(t==that.history.length){//Если достигнут конец сортировки
		clearInterval(interval);
		cell=document.getElementsByClassName("setImage");
		cell=cell[0].childNodes;
		for (var g=1;g<10;g++)
		cell[g].style.border="1px solid green";
		$("#generate").removeAttr("disabled");//Разблокировка кнопки "Сгененрировать последовательность"
		$("#start-stop").val("Старт");//изменение значения кнопки с Стоп на значение Старт
		$("#start-stop").attr({disabled: 'disabled'});//блокировка кнопки Старт
		that.clicking=false;
		}
	
	},3000);//время анимации 3 секунды
	
}
	
};
//функция запуска генерации случайной последовательности и заполнения страницы картинками и значениями, выполняется при нажатии на кнопку "Сгененрировать последовательность"
function init(){
MainObj.history.length=0;//очистка истории, если функция вызывается более 2-х раз
if(!MainObj.clicking){//проверка если кнопка Старт не нажата
$("#start-stop").removeAttr("disabled");
MainObj.path2=Math.floor(Math.random() * (5 + 1));
MainObj.MainArray=MainObj.shuffle(MainObj.MainArray);
MainObj.insertNumber(MainObj.MainArray);
}
}

function start(){//функция запускает процесс пузырьковой сортировки и визуального отображения 
if(!MainObj.clicking){//если кнопка "Сгененрировать последовательность" нажата запускается процесс
MainObj.clicking=true;
$("#generate").attr({disabled: 'disabled'});
$("#start-stop").val("Стоп");
MainObj.Bubble_sort();}
else//Остановка работы скрипта, нажата кнопка Стоп
{
MainObj.clicking=false;
$("#start-stop").attr({disabled: 'disabled'});
}
}
