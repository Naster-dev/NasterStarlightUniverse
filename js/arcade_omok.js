//Class Collection
class Matrix
{
	constructor(_Mx, _My)
	{
		this.row = _My;
		this.col = _Mx;
		this.Mat = new Array(19);

		for(let j=0; j<this.row;j++)
		{
			this.Mat[j]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		}
	}

	ChangeValue(_x, _y, _Value)
	{
		this.Mat[_y][_x] = _Value;
	}
	GetValue(_x, _y)
	{
		return this.Mat[_y][_x];
	}
	Initialize()
	{
		for(let j=0; j<this.row;j++)
		{
			this.Mat[j]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		}
	}
}

let turn=0;	//0:BLACK - 1:WHITE
let endLock = false;
Mapping = new Matrix(19,19);

//오목돌 놓을 때 발생하는 이벤트
function PutonToken()
{
	if(endLock == true) return;

	//from event of Click,
	pos_X = event.layerX;
	pos_Y = event.layerY;
	push_X=0;
	push_Y=0;
	
	//Check vaild position for push token
	for(j = 0; j<19; j++)
	{
		if(9 + (16* j) < pos_Y && pos_Y < 23 + (16* j))
		{
			push_Y = 16 * (j + 1);
			break;
		}
	}

	for(i=0; i<19; i++)
	{
		if(9 + (16* i) < pos_X && pos_X < 23 + (16* i))
		{
			push_X = 16 * (i + 1);
			break;
		}
	}

	if(push_X != 0 && push_Y != 0)
	{
		field = document.getElementById("Arcade_omok");
		ldTok = "";
		//턴에 따라 흑돌/백돌 선택
		if(turn == 0)
		{
			ldTok="tkBlack.png";
			Mapping.ChangeValue(i,j,1);
		}
		else if(turn == 1)
		{
			ldTok="tkWhite.png";
			Mapping.ChangeValue(i,j,2);
		}
		//돌 표시
		modifString = field.innerHTML + "<img src=component/Arcade/Token/" + ldTok + " style='position:absolute;top:" + (push_Y-8) + "px;left:" + (push_X-8) + "px;'></img>";
		field.innerHTML = modifString;

		//승리조건 체크
		CheckRule(i,j,turn);

		//턴을 넘김
		turn++;
		if(turn > 1)turn=0;

		return;
	}

	//Invalid position is clicked.
	return;
}
//연속배치방향을 찾는다
//_dir : 0,1,2,3,4,5,6,7 = 시계방향 12시부터 10시까지
function FindLinkToken(_x,_y,_dir)
{
	present = Mapping.GetValue(_x,_y);
	
	Res = false;

	switch(_dir)
	{
		case 0:
			if(_y == 0) return false;
			else
			{
				Direc = Mapping.GetValue(_x,_y-1);
			}
			break;
		case 1:
			if(_y == 0 || _x == 18) return false;
			else
			{
				Direc = Mapping.GetValue(_x+1,_y-1);
			}
			break;
		case 2:
			if(_x == 18) return false;
			else
			{
				Direc = Mapping.GetValue(_x+1,_y);
			}
			break;
		case 3:
			if(_x == 18 || _y == 18) return false;
			else
			{
				Direc = Mapping.GetValue(_x+1,_y+1);
			}
			break;
		case 4:
			if(_y == 18) return false;
			else
			{
				Direc = Mapping.GetValue(_x,_y+1);
			}
			break;
		case 5:
			if(_y == 18 || _x == 0) return false;
			else
			{
				Direc = Mapping.GetValue(_x-1,_y+1);
			}
			break;
		case 6:
			if(_x == 0) return false;
			else
			{
				Direc = Mapping.GetValue(_x-1,_y);
			}
			break;
		case 7:
			if(_x == 0 || _y == 0) return false;
			else
			{
				Direc = Mapping.GetValue(_x-1,_y-1);
			}
			break;
	}

	if(present == Direc) Res = true;

	return Res;
}


//오목 승리조건 체크
function CheckRule(_x,_y,_turn)
{
	//기준위치
	Ref_x = _x;
	Ref_y = _y;
	//한 줄에 연속된 돌의 개수, 놓은돌 포함이므로, 1부터 시작
	Link_04 = 1;
	Link_15 = 1;
	Link_26 = 1;
	Link_37 = 1;

	//놓은 위치 기준으로, 연속배치된 줄을 찾는다
	if(FindLinkToken(Ref_x,Ref_y,0) == true)
	{
		i = 1;
		Link_04++;
		while(FindLinkToken(Ref_x,Ref_y-i,0) == true)
		{
			Link_04++;
			i++;
		}
	}
	
	if(FindLinkToken(Ref_x,Ref_y,1) == true)
	{
		i = 1;
		Link_15++;
		while(FindLinkToken(Ref_x+i,Ref_y-i,1) == true)
		{
			Link_15++;
			i++;
		}
	}

	if(FindLinkToken(Ref_x,Ref_y,2) == true)
	{
		i = 1;
		Link_26++;
		while(FindLinkToken(Ref_x+i,Ref_y,2) == true)
		{
			Link_26++;
			i++;
		}
	}

	if(FindLinkToken(Ref_x,Ref_y,3) == true)
	{
		i = 1;
		Link_37++;
		while(FindLinkToken(Ref_x+i,Ref_y+i,3) == true)
		{
			Link_37++;
			i++;
		}
	}

	if(FindLinkToken(Ref_x,Ref_y,4) == true)
	{
		i = 1;
		Link_04++;
		while(FindLinkToken(Ref_x,Ref_y+i,4) == true)
		{
			Link_04++;
			i++;
		}
	}

	if(FindLinkToken(Ref_x,Ref_y,5) == true)
	{
		i = 1;
		Link_15++;
		while(FindLinkToken(Ref_x-i,Ref_y+i,5) == true)
		{
			Link_15++;
			i++;
		}
	}

	if(FindLinkToken(Ref_x,Ref_y,6) == true)
	{
		i = 1;
		Link_26++;
		while(FindLinkToken(Ref_x-i,Ref_y,6) == true)
		{
			Link_26++;
			i++;
		}
	}

	if(FindLinkToken(Ref_x,Ref_y,7) == true)
	{
		i = 1;
		Link_37++;
		while(FindLinkToken(Ref_x-i,Ref_y-i,7) == true)
		{
			Link_37++;
			i++;
		}
	}

	if(Link_04 == 5 || Link_15 == 5 || Link_26 == 5 || Link_37 == 5)
	{
		if(_turn == 0)
		{
			modifString = field.innerHTML + "<img src=component/Arcade/ui/winblack.png style='position:absolute;top:135px;left:85px;' onclick='GameReset()'></img>";
			field.innerHTML = modifString;
		}
		else if(_turn == 1)
		{
			modifString = field.innerHTML + "<img src=component/Arcade/ui/winwhite.png style='position:absolute;top:135px;left:85px;' onclick='GameReset()'></img>";
			field.innerHTML = modifString;
		}
		endLock = true;
	}
}

//오목게임 리셋
function GameReset()
{
	field.innerHTML = '<img src="component/Arcade/Field/bgOmok.png" style="position:absolute" onmouseup="PutonToken()"></img>'

	turn = 0;
	Mapping.Initialize();
	endLock = false;
}
