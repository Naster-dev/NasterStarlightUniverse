////공통
//변수조작
//프로세스락
function ProcessLock(_bOn)
{
	if(_bOn) prolock = true;
	else prolock = false;
}
//다음스텝 조작
function SetNextStep(_vel)
{
	xstep = _vel;
}
//다음시퀀스 조작
function SetNextSeq(_vel)
{
	xseq = _vel;
}
//시퀀스 점프
function SetJumpSeq(_vel)
{
	nseq = _vel;
}

////메시지
//표시여부
function MsgDisplay(_bOn)
{
	msgBox = document.getElementById("txtbox");

	if(_bOn)
	{
		msgBox.style.visibility="";
	}
	else
		msgBox.style.visibility="hidden";
}
//클리어
function MsgClear()
{
	msgBox = document.getElementById("txtbox");
	msgBox.innerText = "";
}
//출력
function MsgOutput(title="", lin1="", lin2="", lin3="", lin4="")
{
	msgBox = document.getElementById("txtbox");
	string = title+'\r\n'+lin1+'\r\n'+lin2+'\r\n'+lin3+'\r\n'+lin4;
	
	msgBox.innerText = string;
}
////선택지
//선택지 스텝설정
function SelectBoxBrunch(_s1, _s2, _s3, _s4)
{
	selBox = document.getElementById("SelectBox");

	//선택지에 이벤트 속성 부여
	selBox.children['s1'].onclick = function () {SetSelectJump(_s1);};
	selBox.children['s2'].onclick = function () {SetSelectJump(_s2);};
	selBox.children['s3'].onclick = function () {SetSelectJump(_s3);};
	selBox.children['s4'].onclick = function () {SetSelectJump(_s4);};
}
//선택지아이템 스텝설정 이벤트
function SetSelectJump(_vel)
{
	nstep = _vel;
	SelectBoxEnd();
}
//선택지 불러오기
function SelectBoxCall(_item1="", _item2="",_item3="",_item4="")
{
	ProcessLock(true);

	selBox = document.getElementById("SelectBox");
	//선택지1번
	if(_item1 == "")
	{
		selBox.children['s1'].style.visibility='hidden';
	}
	selBox.children['s1'].innerText=_item1;
	//선택지2번
	if(_item2 == "")
	{
		selBox.children['s2'].style.visibility='hidden';
	}
	selBox.children['s2'].innerText=_item2;
	//선택지3번
	if(_item3 == "")
	{
		selBox.children['s3'].style.visibility='hidden';
	}
	selBox.children['s3'].innerText=_item3;
	//선택지4번
	if(_item4 == "")
	{
		selBox.children['s4'].style.visibility='hidden';
	}
	selBox.children['s4'].innerText=_item4;

	selBox.style.visibility= '';
}
//선택지 비우기
function SelectBoxEnd()
{
	selBox = document.getElementById("SelectBox");

	selBox.style.visibility= 'hidden';
}

/////////////////////////////////////////

//굵은 글씨
function MsgBold(_bOn = false)
{
	msgBox = document.getElementById("TalkBox");
	if(_bOn==true)
		msgBox.style.fontWeight=700;
	else
		msgBox.style.fontWeight=500;
	
}
//폰트 사이즈
function MsgSize(_sz)
{
	msgBox = document.getElementById("TalkBox");
	string = _sz+'px'
	
	msgBox.style.fontSize=string;
}

////오브젝트
//상대값 이동
function ObjectMoveInc(_id, _dx, _dy)
{
	obj = document.getElementById(_id);
	dx = obj.style.left.replace('px','');
	dy = obj.style.top.replace('px','');

	dx = Number(dx)+_dx;
	dy = Number(dy)+_dy;

	obj.style.left = dx + "px";
	obj.style.top = dy + "px";
}
//절대값 이동
function ObjectMoveAbs(_id, _x, _y)
{
	obj = document.getElementById(_id);
	x = obj.style.left.replace('px','');
	y = obj.style.top.replace('px','');
	
	x = _x;
	y = _y;

	obj.style.left = x + "px";
	obj.style.top = y + "px";
}
//스케일링
function ObjectScale(_id, _rate = 1)
{
	obj = document.getElementById(_id);
	obj.style.scale=_rate;
}
//회전
function ObjectRotate(_id, _Theta = 0)
{
	obj = document.getElementById(_id);
	obj.style.transform="rotate(" + _Theta + "deg)";

}
//변경중심 변경
function ObjectSetOrigin(_id, _Ox=50, _Oy=50)
{
	obj = document.getElementById(_id);
	obj.style.transformOrigin=_Ox + "% " + _Oy+"%";
}
//애니메이션 부여
function ObjectSetAnimate(_id, _time=0, _acc=0)
{
	obj = document.getElementById(_id);
	if(_time > 0)
	{
		obj.style.transition= _time + "s";
		if(_acc == 0)
		{
			obj.style.transitionTimingFunction="linear";
		}
		else
		{
			obj.style.transitionTimingFunction="ease";
		}
	}
	else
	{
		obj.style.transition="none"
	}
}
//객체 표시
function ObjectDisplay(_id, _sw='on')
{
	obj = document.getElementById(_id);
	if(_sw=='off')
		obj.style.visibility='hidden';
	else if(_sw=='on')
		obj.style.visibility='visible';
}