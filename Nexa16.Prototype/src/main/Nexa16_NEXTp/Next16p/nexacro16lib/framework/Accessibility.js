//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2014 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro-public-license-readme-1.0.html	
//
//==============================================================================

//==============================================================================
// SenseReader type
//==============================================================================

if (nexacro._accessibilitytype == 2)
{
	///////////////////////////////////////////////////////////
	// TODO : Implement SenseReader Utility function
	///////////////////////////////////////////////////////////
	nexacro._AccessibilityUtil.GridHotkeyList = {};
	nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_HOME] = nexacro._AccessibilityUtil.Hotkey.FIRSTCELLINROW;
	nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_END] = nexacro._AccessibilityUtil.Hotkey.LASTCELLINROW;
    nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_PAGE_UP] = nexacro._AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN;
    nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_PAGE_DOWN] = nexacro._AccessibilityUtil.Hotkey.LASTCELLINCOLUMN;

	nexacro._AccessibilityUtil._usetooltip = false;

	nexacro._AccessibilityUtil.getAccessibilityLabel = function (elem)
	{
		var strLabel = "";

		if (elem && elem.linkedcontrol)
		{
			strLabel = elem.accessibilitylabel;
			}
		return strLabel;
	};

	nexacro._AccessibilityUtil.getAccessibilityAction = function (elem)
	{
		var strAction = "";
		if (elem)
		{
			strAction = elem.accessibilityaction;
		}
		return strAction;
	};

	nexacro._AccessibilityUtil.getAccessibilityDescription = function (elem)
	{
		var strDescription = "";
		if (elem)
		{
			strDescription = elem.accessibilitydescription;
		}
		return strDescription;
	};

	nexacro._AccessibilityUtil.setDOMNodeLabel = function (node, label)
	{
		node.innerText = label;
	};

	nexacro._AccessibilityUtil.getAccessibilityAdditionalLabel = function (elem)
	{
	    var strAdditionalLabel = "";
	    if (elem)
	    {
	        var comp = elem.linkedcontrol;
	        strAdditionalLabel = comp._on_getAccessibilityAdditionalLabel() + comp._on_getAccessibilityAdditionalRole();
	    }
	    return strAdditionalLabel;
	};
}
//==============================================================================
// JAWS type
//==============================================================================
else if (nexacro._accessibilitytype == 3)
{
	///////////////////////////////////////////////////////////
	// TODO : Implement JAWS Utility function
	///////////////////////////////////////////////////////////
	nexacro._AccessibilityUtil.GridHotkeyList = {};
	nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_HOME] = nexacro._AccessibilityUtil.Hotkey.FIRSTCELL;
	nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_END] = nexacro._AccessibilityUtil.Hotkey.LASTCELL;
	nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_UP] = nexacro._AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN;
	nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_DOWN] = nexacro._AccessibilityUtil.Hotkey.LASTCELLINCOLUMN;
	nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_LEFT] = nexacro._AccessibilityUtil.Hotkey.FIRSTCELLINROW;
	nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_RIGHT] = nexacro._AccessibilityUtil.Hotkey.LASTCELLINROW;

	nexacro._AccessibilityUtil._usetooltip = true;

	nexacro._AccessibilityUtil.getAccessibilityLabel = function (elem)
	{
		var strLabel = "";
		if (elem)
		{
		    strLabel = elem.accessibilitylabel;
		}
		return strLabel;
	};

	nexacro._AccessibilityUtil.getAccessibilityAction = function (elem)
	{
		var strAction = "";
		if (elem)
		{
			strAction = elem.accessibilityaction;
		}
		return strAction;
	};

	nexacro._AccessibilityUtil.getAccessibilityDescription = function (elem)
	{
		var strDescription = "";
		if (elem)
		{
			strDescription = elem.accessibilitydescription;
		}
		return strDescription;
	};

	nexacro._AccessibilityUtil.setDOMNodeLabel = function (node, label)
	{
		node.setAttribute("aria-live", "assertive");
		node.innerHTML = label;
	};
}
//==============================================================================
// Standard type
//==============================================================================
else
{
	///////////////////////////////////////////////////////////
	// TODO : Implement Standard Utility function
	///////////////////////////////////////////////////////////

	//allow jaws' hotkey
	nexacro._AccessibilityUtil.GridHotkeyList = {};
	nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_HOME] = nexacro._AccessibilityUtil.Hotkey.FIRSTCELL;
	nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_END] = nexacro._AccessibilityUtil.Hotkey.LASTCELL;
	nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_UP] = nexacro._AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN;
	nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_DOWN] = nexacro._AccessibilityUtil.Hotkey.LASTCELLINCOLUMN;
	nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_LEFT] = nexacro._AccessibilityUtil.Hotkey.FIRSTCELLINROW;
	nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_RIGHT] = nexacro._AccessibilityUtil.Hotkey.LASTCELLINROW;

	nexacro._AccessibilityUtil._usetooltip = true;

	nexacro._AccessibilityUtil.getAccessibilityLabel = function (elem)
	{
		var strLabel = "";
		if (elem)
		{
		    strLabel = elem.accessibilitylabel;
		}
		return strLabel;
	};

	nexacro._AccessibilityUtil.getAccessibilityAction = function (elem)
	{
		var strAction = "";
		if (elem)
		{
			strAction = elem.accessibilityaction;
		}
		return strAction;
	};

	nexacro._AccessibilityUtil.getAccessibilityDescription = function (elem)
	{
		var strDescription = "";
		if (elem)
		{
			strDescription = elem.accessibilitydescription;
		}
		return strDescription;
	};

	nexacro._AccessibilityUtil.setDOMNodeLabel = function (node, label)
	{
		node.setAttribute("aria-live", "assertive");
		node.innerHTML = label;
	};
}

nexacro._AccessibilityUtil.checkComponentHotkey = function (obj, keyCode, altKey, ctrlKey, shiftKey)
{
	var strHotkey = "";
	var hotkeyList = null;

	if (ctrlKey)
	{
		strHotkey = strHotkey + nexacro.Event.KEY_CTRL + " ";
	}
	if (altKey)
	{
		strHotkey = strHotkey + nexacro.Event.KEY_ALT + " ";
	}
	if (shiftKey)
	{
		strHotkey = strHotkey + nexacro.Event.KEY_SHIFT + " ";
	}

	strHotkey = strHotkey + keyCode;

    if (obj instanceof nexacro.Grid)
	{
		hotkeyList = nexacro._AccessibilityUtil.GridHotkeyList;
	}
	
    if (hotkeyList)
	{
		return hotkeyList[strHotkey];
	}

	return nexacro._AccessibilityUtil.Hotkey.NONE;
};

nexacro._AccessibilityUtil.isUseTooltipText = function ()
{
    if (nexacro._enableaccessibility && !nexacro._AccessibilityUtil._usetooltip)
    {
        return false;
    }
    return true;
};

nexacro._createFrameNode = nexacro._destroyFrameNode = nexacro._emptyFn;