/* Generated by the Nim Compiler v0.17.2 */
/*   (c) 2017 Andreas Rumpf */

var framePtr = null;
var excHandler = 0;
var lastJSError = null;
if (typeof Int8Array === 'undefined') Int8Array = Array;
if (typeof Int16Array === 'undefined') Int16Array = Array;
if (typeof Int32Array === 'undefined') Int32Array = Array;
if (typeof Uint8Array === 'undefined') Uint8Array = Array;
if (typeof Uint16Array === 'undefined') Uint16Array = Array;
if (typeof Uint32Array === 'undefined') Uint32Array = Array;
if (typeof Float32Array === 'undefined') Float32Array = Array;
if (typeof Float64Array === 'undefined') Float64Array = Array;
var NTI140 = {size: 0,kind: 29,base: null,node: null,finalizer: null};
var NTI64005 = {size: 0, kind: 18, base: null, node: null, finalizer: null};
var NTI64003 = {size: 0,kind: 22,base: null,node: null,finalizer: null};
var NTI64220 = {size: 0,kind: 24,base: null,node: null,finalizer: null};
var NTI124 = {size: 0,kind: 36,base: null,node: null,finalizer: null};
var NTI42021 = {size: 0, kind: 18, base: null, node: null, finalizer: null};
var NNI42021 = {kind: 2, len: 2, offset: 0, typ: null, name: null, sons: [{kind: 1, offset: "x", len: 0, typ: NTI124, name: "x", sons: null}, 
{kind: 1, offset: "y", len: 0, typ: NTI124, name: "y", sons: null}]};
NTI42021.node = NNI42021;
var NNI64005 = {kind: 2, len: 3, offset: 0, typ: null, name: null, sons: [{kind: 1, offset: "pt", len: 0, typ: NTI42021, name: "pt", sons: null}, 
{kind: 1, offset: "size", len: 0, typ: NTI124, name: "size", sons: null}, 
{kind: 1, offset: "color", len: 0, typ: NTI140, name: "color", sons: null}]};
NTI64005.node = NNI64005;
NTI64003.base = NTI64005;
NTI64220.base = NTI64003;

function setConstr() {
		      var result = {};
      for (var i = 0; i < arguments.length; ++i) {
        var x = arguments[i];
        if (typeof(x) == "object") {
          for (var j = x[0]; j <= x[1]; ++j) {
            result[j] = true;
          }
        } else {
          result[x] = true;
        }
      }
      return result;
    

	
}
var ConstSet1 = setConstr(17, 16, 4, 18, 27, 19, 23, 22, 21);

function nimCopy(dest_19817, src_19818, ti_19819) {
	var result_20229 = null;

		switch (ti_19819.kind) {
		case 21:
		case 22:
		case 23:
		case 5:
			if (!(isFatPointer_19801(ti_19819))) {
			result_20229 = src_19818;
			}
			else {
				result_20229 = [src_19818[0], src_19818[1]];
			}
			
			break;
		case 19:
			      if (dest_19817 === null || dest_19817 === undefined) {
        dest_19817 = {};
      }
      else {
        for (var key in dest_19817) { delete dest_19817[key]; }
      }
      for (var key in src_19818) { dest_19817[key] = src_19818[key]; }
      result_20229 = dest_19817;
    
			break;
		case 18:
		case 17:
			if (!((ti_19819.base == null))) {
			result_20229 = nimCopy(dest_19817, src_19818, ti_19819.base);
			}
			else {
			if ((ti_19819.kind == 17)) {
			result_20229 = (dest_19817 === null || dest_19817 === undefined) ? {m_type: ti_19819} : dest_19817;
			}
			else {
				result_20229 = (dest_19817 === null || dest_19817 === undefined) ? {} : dest_19817;
			}
			}
			nimCopyAux(result_20229, src_19818, ti_19819.node);
			break;
		case 24:
		case 4:
		case 27:
		case 16:
			      if (src_19818 === null) {
        result_20229 = null;
      }
      else {
        if (dest_19817 === null || dest_19817 === undefined) {
          dest_19817 = new Array(src_19818.length);
        }
        else {
          dest_19817.length = src_19818.length;
        }
        result_20229 = dest_19817;
        for (var i = 0; i < src_19818.length; ++i) {
          result_20229[i] = nimCopy(result_20229[i], src_19818[i], ti_19819.base);
        }
      }
    
			break;
		case 28:
			      if (src_19818 !== null) {
        result_20229 = src_19818.slice(0);
      }
    
			break;
		default: 
			result_20229 = src_19818;
			break;
		}

	return result_20229;

}

function makeNimstrLit(c_14603) {
		    var ln = c_14603.length;
    var result = new Array(ln + 1);
    var i = 0;
    for (; i < ln; ++i) {
      result[i] = c_14603.charCodeAt(i);
    }
    result[i] = 0; // terminating zero
    return result;
    

	
}

function toJSStr(s_15003) {
		    var len = s_15003.length-1;
    var asciiPart = new Array(len);
    var fcc = String.fromCharCode;
    var nonAsciiPart = null;
    var nonAsciiOffset = 0;
    for (var i = 0; i < len; ++i) {
      if (nonAsciiPart !== null) {
        var offset = (i - nonAsciiOffset) * 2;
        var code = s_15003[i].toString(16);
        if (code.length == 1) {
          code = "0"+code;
        }
        nonAsciiPart[offset] = "%";
        nonAsciiPart[offset + 1] = code;
      }
      else if (s_15003[i] < 128)
        asciiPart[i] = fcc(s_15003[i]);
      else {
        asciiPart.length = i;
        nonAsciiOffset = i;
        nonAsciiPart = new Array((len - i) * 2);
        --i;
      }
    }
    asciiPart = asciiPart.join("");
    return (nonAsciiPart === null) ?
        asciiPart : asciiPart + decodeURIComponent(nonAsciiPart.join(""));
  

	
}
var nimvm_6119 = false;
var nim_program_result = 0;
var globalRaiseHook_11605 = [null];
var localRaiseHook_11610 = [null];
var outOfMemHook_11613 = [null];
var IDMATRIX_42056 = matrix2d_42040(1.0000000000000000e+000, 0.0, 0.0, 1.0000000000000000e+000, 0.0, 0.0);
var ORIGO_42057 = point2d_42052(0.0, 0.0);
var XAXIS_42058 = vector2d_42048(1.0000000000000000e+000, 0.0);
var YAXIS_42059 = vector2d_42048(0.0, 1.0000000000000000e+000);
var lc_52240 = [{}];
var state_54605 = [{a0: 1773455756, a1: 4275166512}];

function getTime_57042() {
	var result_59413 = 0.0;

	BeforeRet: do {
		result_59413 = new Date();
		break BeforeRet;
	} while (false);

	return result_59413;

}
var startMilsecs_59512 = [getTime_57042()];

function rotl_54802(x_54804, k_54805) {
	var result_54806 = 0;

		result_54806 = ((x_54804 << k_54805) | ((x_54804 >>> 0) >>> ((64 - k_54805) >>> 0)));

	return result_54806;

}

function next_54842(s_54845) {
	var result_54846 = 0;

		var s0_54847 = s_54845.a0;
		var s1_54848 = s_54845.a1;
		result_54846 = ((s0_54847 + s1_54848) >>> 0);
		s1_54848 = (s1_54848 ^ s0_54847);
		s_54845.a0 = ((rotl_54802(s0_54847, 55) ^ s1_54848) ^ (s1_54848 << 14));
		s_54845.a1 = rotl_54802(s1_54848, 36);

	return result_54846;

}

function randomize_55434(seed_55436) {
		state_54605[0].a0 = ((seed_55436 ) >>> 16);
		state_54605[0].a1 = (seed_55436 & 65535);
		next_54842(state_54605[0]);

	
}

function randomize_60001() {
		randomize_55434(getTime_57042().getTime());

	
}

function newSeq_64235(len_64239) {
	var result_64241 = null;

		result_64241 = new Array(len_64239); for (var i=0;i<len_64239;++i) {result_64241[i]=null;}
	return result_64241;

}

function random_55318(max_55320) {
	var result_55321 = 0.0;

		var x_55323 = next_54842(state_54605[0]);
		result_55321 = ((x_55323 / 4294967295) * max_55320);

	return result_55321;

}

function new_64275() {
	var result_64280 = null;

	BeforeRet: do {
		var r_64401 = null;
		r_64401 = {pt: {x: 0.0, y: 0.0}, size: 0.0, color: null};
		result_64280 = r_64401;
		break BeforeRet;
	} while (false);

	return result_64280;

}

function point2d_42052(x_42054, y_42055) {
	var result_42918 = {x: 0.0, y: 0.0};

		result_42918.x = x_42054;
		result_42918.y = y_42055;

	return result_42918;

}

function isFatPointer_19801(ti_19803) {
	var result_19804 = false;

	BeforeRet: do {
		result_19804 = !((ConstSet1[ti_19803.base.kind] != undefined));
		break BeforeRet;
	} while (false);

	return result_19804;

}

function nimCopyAux(dest_19822, src_19823, n_19825) {
		switch (n_19825.kind) {
		case 0:
			break;
		case 1:
			      dest_19822[n_19825.offset] = nimCopy(dest_19822[n_19825.offset], src_19823[n_19825.offset], n_19825.typ);
    
			break;
		case 2:
			L1: do {
				var i_20215 = 0;
				var colontmp__20217 = 0;
				colontmp__20217 = (n_19825.len - 1);
				var res_20220 = 0;
				L2: do {
						L3: while (true) {
						if (!(res_20220 <= colontmp__20217)) break L3;
							i_20215 = res_20220;
							nimCopyAux(dest_19822, src_19823, n_19825.sons[i_20215]);
							res_20220 += 1;
						}
				} while(false);
			} while(false);
			break;
		case 3:
			      dest_19822[n_19825.offset] = nimCopy(dest_19822[n_19825.offset], src_19823[n_19825.offset], n_19825.typ);
      for (var i = 0; i < n_19825.sons.length; ++i) {
        nimCopyAux(dest_19822, src_19823, n_19825.sons[i][1]);
      }
    
			break;
		}

	
}

function makeSnow_64212(n_64214, width_64215, height_64216) {
						var Tmp4;

	var result_64218 = null;

	BeforeRet: do {
		randomize_60001();
		var snows_64259 = newSeq_64235(n_64214);
		L1: do {
			var i_64271 = 0;
			var colontmp__64416 = 0;
			colontmp__64416 = (n_64214 - 1);
			var res_64419 = 0;
			L2: do {
					L3: while (true) {
					if (!(res_64419 <= colontmp__64416)) break L3;
						i_64271 = res_64419;
						var size_64272 = (random_55318(1.0000000000000000e+000) * 2.2000000000000000e+001);
						var snow_64410 = new_64275();
						nimCopy(snow_64410.pt, point2d_42052(random_55318(width_64215), random_55318(height_64216)), NTI42021);
						snow_64410.size = size_64272;
						if ((size_64272 < 5.0000000000000000e+000)) {
						Tmp4 = makeNimstrLit("#A0A0A0");
						}
						else {
						if ((size_64272 < 1.0000000000000000e+001)) {
						Tmp4 = makeNimstrLit("#C0C0C0");
						}
						else {
						if ((size_64272 < 1.5000000000000000e+001)) {
						Tmp4 = makeNimstrLit("#E0E0E0");
						}
						else {
						Tmp4 = makeNimstrLit("#FFFFFF");
						}
						}}
						snow_64410.color = toJSStr(Tmp4);
						snows_64259[i_64271] = snow_64410;
						res_64419 += 1;
					}
			} while(false);
		} while(false);
		result_64218 = nimCopy(null, snows_64259, NTI64220);
		break BeforeRet;
	} while (false);

	return result_64218;

}

function median3_64752(x_64756, y_64758, z_64760) {
	var result_64761 = 0.0;

	BeforeRet: do {
		if ((x_64756 < y_64758)) {
		if ((y_64758 < z_64760)) {
		result_64761 = y_64758;
		break BeforeRet;
		}
		else {
		if ((z_64760 < x_64756)) {
		result_64761 = x_64756;
		break BeforeRet;
		}
		else {
			result_64761 = z_64760;
			break BeforeRet;
		}
		}
		}
		else {
			if ((z_64760 < y_64758)) {
			result_64761 = y_64758;
			break BeforeRet;
			}
			else {
			if ((x_64756 < z_64760)) {
			result_64761 = x_64756;
			break BeforeRet;
			}
			else {
				result_64761 = z_64760;
				break BeforeRet;
			}
			}
		}
		
	} while (false);

	return result_64761;

}

function quicksort2_64731(list_64735, list_64735_Idx, left_64736, right_64737) {
	BeforeRet: do {
		var diff_64738 = (right_64737 - left_64736);
		if ((diff_64738 <= 0)) {
		break BeforeRet;
		}
		else {
		if ((diff_64738 == 1)) {
		if ((list_64735[list_64735_Idx][left_64736].size <= list_64735[list_64735_Idx][right_64737].size)) {
		break BeforeRet;
		}
		else {
			var Tmp1 = list_64735[list_64735_Idx][left_64736]; list_64735[list_64735_Idx][left_64736] = list_64735[list_64735_Idx][right_64737]; list_64735[list_64735_Idx][right_64737] = Tmp1;			break BeforeRet;
		}
		
		}
		else {
			var i_64749 = left_64736;
			var j_64750 = right_64737;
			var pivot_64762 = median3_64752(list_64735[list_64735_Idx][i_64749].size, list_64735[list_64735_Idx][(i_64749 + Math.floor((j_64750 - i_64749) / 2))].size, list_64735[list_64735_Idx][j_64750].size);
			L2: do {
					L3: while (true) {
					if (!true) break L3;
						L4: do {
								L5: while (true) {
								if (!(list_64735[list_64735_Idx][i_64749].size < pivot_64762)) break L5;
									i_64749 += 1;
								}
						} while(false);
						L6: do {
								L7: while (true) {
								if (!(pivot_64762 < list_64735[list_64735_Idx][j_64750].size)) break L7;
									j_64750 -= 1;
								}
						} while(false);
						if ((j_64750 <= i_64749)) {
						break L2;
						}
						else {
							var Tmp8 = list_64735[list_64735_Idx][i_64749]; list_64735[list_64735_Idx][i_64749] = list_64735[list_64735_Idx][j_64750]; list_64735[list_64735_Idx][j_64750] = Tmp8;							i_64749 += 1;
							j_64750 -= 1;
						}
						
					}
			} while(false);
			quicksort2_64731(list_64735, list_64735_Idx, left_64736, (i_64749 - 1));
			quicksort2_64731(list_64735, list_64735_Idx, (j_64750 + 1), right_64737);
		}
		}
	} while (false);

	
}

function getContext2D_63513(c_63515) {
	var result_63516 = null;

		result_63516=c_63515.getContext('2d');

	return result_63516;

}

function fillStyleeq__63089(ctx_63091, color_63092) {
		ctx_63091.fillStyle=color_63092;

	
}

function cls_64050(ctx_64052, width_64053, height_64054) {
		fillStyleeq__63089(ctx_64052, "#0D0015");
		ctx_64052.fillRect(0.0, 0.0, width_64053, height_64054);

	
}

function draw_64010(ctx_64012, snow_64013) {
		fillStyleeq__63089(ctx_64012, snow_64013.color);
		ctx_64012.beginPath();
		ctx_64012.arc(snow_64013.pt.x, snow_64013.pt.y, (snow_64013.size / 2.0000000000000000e+000), 0.0, 6.2831853071795862e+000, true);
		ctx_64012.fill();

	
}

function setElements_42116(t_42119, ax_42120, ay_42121, bx_42122, by_42123, tx_42124, ty_42125) {
		t_42119.ax = ax_42120;
		t_42119.ay = ay_42121;
		t_42119.bx = bx_42122;
		t_42119.by = by_42123;
		t_42119.tx = tx_42124;
		t_42119.ty = ty_42125;

	
}

function move_42178(dx_42180, dy_42181) {
	var result_42182 = [{ax: 0.0, ay: 0.0, bx: 0.0, by: 0.0, tx: 0.0, ty: 0.0}];

		setElements_42116(result_42182[0], 1.0000000000000000e+000, 0.0, 0.0, 1.0000000000000000e+000, dx_42180, dy_42181);

	return result_42182[0];

}

function ampeq__42959(p_42962, t_42963) {
		var newx_42964 = (((p_42962.x * t_42963.ax) + (p_42962.y * t_42963.bx)) + t_42963.tx);
		p_42962.y = (((p_42962.x * t_42963.ay) + (p_42962.y * t_42963.by)) + t_42963.ty);
		p_42962.x = newx_42964;

	
}

function minuseq__42738(x_42743, x_42743_Idx, y_42745) {
		x_42743[x_42743_Idx] = (x_42743[x_42743_Idx] - y_42745);

	
}

function move_64016(snow_64018, width_64019, height_64020) {
		var dx_64023 = (random_55318(1.0000000000000000e+000) * 3.0000000000000000e+000);
		var dy_64024 = (random_55318(1.0000000000000000e+000) * 5.0000000000000000e+000);
		var m_64025 = move_42178(dx_64023, dy_64024);
		ampeq__42959(snow_64018.pt, m_64025);
		if ((width_64019 < snow_64018.pt.x)) {
		minuseq__42738(snow_64018.pt, "x", width_64019);
		}
		
		if ((height_64020 < snow_64018.pt.y)) {
		minuseq__42738(snow_64018.pt, "y", height_64020);
		}
		

	
}

function loop_64056(canvas_64058, snows_64060) {
		var width_64061 = canvas_64058.width;
		var height_64062 = canvas_64058.height;
		var ctx_64063 = getContext2D_63513(canvas_64058);
		cls_64050(ctx_64063, width_64061, height_64062);
		L1: do {
			var snow_64202 = null;
			var i_64209 = 0;
			var L_64211 = (snows_64060 != null ? snows_64060.length : 0);
			L2: do {
					L3: while (true) {
					if (!(i_64209 < L_64211)) break L3;
						snow_64202 = snows_64060[i_64209];
						draw_64010(ctx_64063, snow_64202);
						move_64016(snow_64202, width_64061, height_64062);
						i_64209 += 1;
					}
			} while(false);
		} while(false);

	
}

function main_64816() {

		function colonanonymous__64850() {
				loop_64056(canvas_64848, snows_64831[0]);

			
		}

		var snows_64831 = [makeSnow_64212(100, 1.0000000000000000e+003, 5.0000000000000000e+002)];
		quicksort2_64731(snows_64831, 0, 0, (snows_64831[0] != null ? (snows_64831[0].length-1) : -1));
		var canvas_64848 = document.getElementById("snow");
		canvas_64848.width = 1000;
		canvas_64848.height = 500;
		var timer_64852 = window.setInterval(colonanonymous__64850, 16);

	
}
main_64816();

function matrix2d_42040(ax_42042, ay_42043, bx_42044, by_42045, tx_42046, ty_42047) {
	var result_42134 = [{ax: 0.0, ay: 0.0, bx: 0.0, by: 0.0, tx: 0.0, ty: 0.0}];

		setElements_42116(result_42134[0], ax_42042, ay_42043, bx_42044, by_42045, tx_42046, ty_42047);

	return result_42134[0];

}

function vector2d_42048(x_42050, y_42051) {
	var result_42319 = {x: 0.0, y: 0.0};

		result_42319.x = x_42050;
		result_42319.y = y_42051;

	return result_42319;

}
