damage = function (spellString){
	var sumDmg = 3; //damage of first 'fe' and last 'ai' in spell (1+2) becouse they need to be there for spell to work 
	//subspells in hierarchy from highest priority to lowest depending which should be counted first and if spell effect other one
	//'fe' and last 'ai' are executed first becouse we know they must be there plus they cant be interupted by other subspells
	//'ai' is also here becouse there can by more than one in spell
	var subSpells = [		
		{
			name: "dai",
			dmg: 5
		},
		{
			name: "ne",
			dmg: 2
		},
		{
			name: "ain",
			dmg: 3
		},
		{						
			name: "ai",		
			dmg: 2
		},
		{
			name: "jee",
			dmg: 3
		},
		{
			name: "je",
			dmg: 2
		},
	];		
	if(	spellString.indexOf("fe") != spellString.lastIndexOf("fe")	 	//checks if there is at least one 'ai' and 'fe', also if there is no more than two 'fe' if so returns 0
		||spellString.indexOf("fe")==-1 
		|| spellString.indexOf("ai")==-1)
		return 0;
	spellString = spellString.substring(spellString.indexOf("fe")+2,spellString.lastIndexOf("ai"));		// leaving characters between 'fe' and last 'ai'
	subSpells.map((v) => {
		while(spellString.indexOf(v.name)!=-1){			//checking if there is subspell in spellString if so replaceing it with '_' symbol and adding damage
			spellString = spellString.substr(0,spellString.indexOf(v.name)) + "_" + spellString.substr(spellString.indexOf(v.name)+v.name.length);
			sumDmg+=v.dmg;
		}
	});
	//decrease damage for character that left in spellString, not counting '_' symbol we used to replace subspells, 
	//we cant remove subspell and 'glue' the rest becouse that can create new subspell that shouldn't be there so we separate them with '_'
	for(var i=0;i<spellString.length;i++){		
		if(spellString[i]!=='_'){
			sumDmg--;
		}
	}
	if(sumDmg<0)	//checks if output damage is lower than zero if so return 0;
		return 0;
	return sumDmg;
};
//testing section
x=damage("feaineain'");	//spell here
console.log(x);			//damage output	
