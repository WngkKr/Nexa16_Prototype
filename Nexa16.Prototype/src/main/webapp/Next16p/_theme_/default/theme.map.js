(function()
{
	return function()
	{
		nexacro._setCSSMaps(
		{
		"Button":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#000000"),
				"textPadding" : nexacro.PaddingObject("0px 10px 0px 10px"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"iconPosition" : "left",
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordWrap" : "none",
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"mouseover" :
			{
				"border" : nexacro.BorderObject("1px solid #666666")
			},
			"focused" :
			{
				"border" : nexacro.BorderObject("2px solid #0078d6")
			},
			"pushed" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"color" : nexacro.ColorObject("#ffffff")
			},
			"selected" :
			{
				"border" : nexacro.BorderObject("2px solid #0078d6")
			},
			"disabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"color" : nexacro.ColorObject("#999999")
			}
		}
	},
	"Calendar":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #999999"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"calendaredit":
	{
		"parent" :
		{
			"Calendar":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"padding" : nexacro.PaddingObject("0px 10px 0px 10px"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"disabled" :
					{
						"color" : nexacro.ColorObject("#999999")
					}
				}
			},
			"CalendarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"padding" : nexacro.PaddingObject("0px 10px 0px 10px"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"disabled" :
					{
						"color" : nexacro.ColorObject("#999999")
					}
				}
			}
		}
	},
	"dropbutton":
	{
		"parent" :
		{
			"Calendar":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_CalDrop_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
	
					},
					"pushed" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_CalDrop_P.png\")")
					},
					"disabled" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_CalDrop_D.png\")")
					}
				}
			},
			"CalendarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_CalDrop_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
	
					},
					"pushed" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_CalDrop_P.png\")")
					},
					"disabled" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_CalDrop_D.png\")")
					}
				}
			},
			"Combo":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_drop_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
	
					},
					"pushed" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_drop_P.png\")")
					},
					"disabled" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_drop_D.png\")")
					}
				}
			},
			"ComboControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_drop_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
	
					},
					"pushed" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_drop_P.png\")")
					},
					"disabled" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_drop_D.png\")")
					}
				}
			}
		}
	},
	"spindownbutton":
	{
		"parent" :
		{
			"Calendar":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinDown_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinDown_N.png\")")
					},
					"pushed" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinDown_P.png\")")
					},
					"disabled" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinDown_D.png\")")
					}
				}
			},
			"CalendarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinDown_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinDown_N.png\")")
					},
					"pushed" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinDown_P.png\")")
					},
					"disabled" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinDown_D.png\")")
					}
				}
			},
			"monthspin":
			{
				"parent" :
				{
					"head":
					{
						"parent" :
						{
							"DatePickerControl":
							{
								"self" :
								{
									"enabled" :
									{
										"border" : nexacro.BorderObject("0px none"),
										"icon" : nexacro.UrlObject("URL(\"theme://images/btn_CalHeadSpinDown_N.png\")"),
										"letterSpacing" : nexacro.CSSValueObject("normal"),
										"iconPosition" : "left",
										"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
										"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
										"wordWrap" : "none",
										"wordSpacing" : nexacro.CSSValueObject("normal")
									},
									"mouseover" :
									{
										"border" : nexacro.BorderObject("0px none")
									},
									"pushed" :
									{
										"icon" : nexacro.UrlObject("URL(\"theme://images/btn_CalHeadSpinDown_P.png\")")
									}
								}
							}
						}
					}
				}
			},
			"yearspin":
			{
				"parent" :
				{
					"head":
					{
						"parent" :
						{
							"DatePickerControl":
							{
								"self" :
								{
									"enabled" :
									{
										"border" : nexacro.BorderObject("0px none"),
										"icon" : nexacro.UrlObject("URL(\"theme://images/btn_CalHeadSpinDown_N.png\")"),
										"letterSpacing" : nexacro.CSSValueObject("normal"),
										"iconPosition" : "left",
										"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
										"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
										"wordWrap" : "none",
										"wordSpacing" : nexacro.CSSValueObject("normal")
									},
									"mouseover" :
									{
										"border" : nexacro.BorderObject("0px none")
									},
									"pushed" :
									{
										"icon" : nexacro.UrlObject("URL(\"theme://images/btn_CalHeadSpinDown_P.png\")")
									}
								}
							}
						}
					}
				}
			},
			"Spin":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("1px solid #f2f2f2"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinDown_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinDown_N.png\")")
					},
					"pushed" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinDown_P.png\")")
					},
					"disabled" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinDown_D.png\")")
					}
				}
			},
			"Tab":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("1px solid #cccccc"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_tabspindown_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"focused" :
					{
						"border" : nexacro.BorderObject("1px solid #cccccc"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_tabspindown_N.png\")")
					},
					"mouseover" :
					{
						"border" : nexacro.BorderObject("1px solid #666666"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_tabspindown_N.png\")")
					},
					"pushed" :
					{
						"border" : nexacro.BorderObject("1px solid #606060"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_tabspindown_P.png\")")
					},
					"disabled" :
					{
						"border" : nexacro.BorderObject("1px solid #f0f0f0"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_tabspindown_P.png\")")
					}
				}
			}
		}
	},
	"spinupbutton":
	{
		"parent" :
		{
			"Calendar":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinUp_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinUp_N.png\")")
					},
					"pushed" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinUp_P.png\")")
					},
					"disabled" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinUp_D.png\")")
					}
				}
			},
			"CalendarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinUp_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinUp_N.png\")")
					},
					"pushed" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinUp_P.png\")")
					},
					"disabled" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinUp_D.png\")")
					}
				}
			},
			"monthspin":
			{
				"parent" :
				{
					"head":
					{
						"parent" :
						{
							"DatePickerControl":
							{
								"self" :
								{
									"enabled" :
									{
										"border" : nexacro.BorderObject("0px none"),
										"icon" : nexacro.UrlObject("URL(\"theme://images/btn_CalHeadSpinUp_N.png\")"),
										"letterSpacing" : nexacro.CSSValueObject("normal"),
										"iconPosition" : "left",
										"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
										"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
										"wordWrap" : "none",
										"wordSpacing" : nexacro.CSSValueObject("normal")
									},
									"mouseover" :
									{
										"border" : nexacro.BorderObject("0px none")
									},
									"pushed" :
									{
										"icon" : nexacro.UrlObject("URL(\"theme://images/btn_CalHeadSpinUp_P.png\")")
									}
								}
							}
						}
					}
				}
			},
			"yearspin":
			{
				"parent" :
				{
					"head":
					{
						"parent" :
						{
							"DatePickerControl":
							{
								"self" :
								{
									"enabled" :
									{
										"border" : nexacro.BorderObject("0px none"),
										"icon" : nexacro.UrlObject("URL(\"theme://images/btn_CalHeadSpinUp_N.png\")"),
										"letterSpacing" : nexacro.CSSValueObject("normal"),
										"iconPosition" : "left",
										"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
										"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
										"wordWrap" : "none",
										"wordSpacing" : nexacro.CSSValueObject("normal")
									},
									"mouseover" :
									{
										"border" : nexacro.BorderObject("0px none")
									},
									"pushed" :
									{
										"icon" : nexacro.UrlObject("URL(\"theme://images/btn_CalHeadSpinUp_P.png\")")
									}
								}
							}
						}
					}
				}
			},
			"Spin":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("1px solid #f2f2f2"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinUp_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinUp_N.png\")")
					},
					"pushed" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinUp_P.png\")")
					},
					"disabled" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_SpinUp_D.png\")")
					}
				}
			},
			"Tab":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("1px solid #cccccc"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_tabspinup_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"focused" :
					{
						"border" : nexacro.BorderObject("1px solid #cccccc"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_tabspinup_N.png\")")
					},
					"mouseover" :
					{
						"border" : nexacro.BorderObject("1px solid #666666"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_tabspinup_N.png\")")
					},
					"pushed" :
					{
						"border" : nexacro.BorderObject("1px solid #606060"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_tabspinup_P.png\")")
					},
					"disabled" :
					{
						"border" : nexacro.BorderObject("1px solid #f0f0f0"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_tabspinup_P.png\")")
					}
				}
			}
		}
	},
	"CalendarControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #999999"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"CheckBox":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#000000"),
				"textPadding" : nexacro.PaddingObject("0px 0px 0px 5px"),
				"icon" : nexacro.UrlObject("URL(\"theme://images/img_check_NN.png\")"),
				"iconPosition" : "left",
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"mouseover" :
			{
				"icon" : nexacro.UrlObject("URL(\"theme://images/img_check_ON.png\")")
			},
			"selected" :
			{
				"icon" : nexacro.UrlObject("URL(\"theme://images/img_check_NS.png\")")
			},
			"disabled" :
			{
				"color" : nexacro.ColorObject("#999999"),
				"icon" : nexacro.UrlObject("URL(\"theme://images/img_check_DN.png\")")
			},
			"mouseover_selected" :
			{
				"icon" : nexacro.UrlObject("URL(\"theme://images/img_check_OS.png\")")
			},
			"disabled_selected" :
			{
				"color" : nexacro.ColorObject("#999999"),
				"icon" : nexacro.UrlObject("URL(\"theme://images/img_check_DS.png\")")
			}
		}
	},
	"ChildFrame":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none")
			}
		}
	},
	"Combo":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #999999"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"comboedit":
	{
		"parent" :
		{
			"Combo":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 10px"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"disabled" :
					{
						"color" : nexacro.ColorObject("#999999")
					}
				}
			},
			"ComboControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 10px"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"disabled" :
					{
						"color" : nexacro.ColorObject("#999999")
					}
				}
			}
		}
	},
	"combolist":
	{
		"parent" :
		{
			"Combo":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("1px solid #cccccc"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					}
				}
			},
			"ComboControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("1px solid #cccccc"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					}
				}
			}
		}
	},
	"listboxitem":
	{
		"parent" :
		{
			"combolist":
			{
				"parent" :
				{
					"Combo":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"font" : nexacro.FontObject("8pt \"맑은 고딕\""),
								"color" : nexacro.ColorObject("#000000"),
								"padding" : nexacro.PaddingObject("5px 10px 5px 10px"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"wordSpacing" : nexacro.CSSValueObject("normal")
							}
						}
					},
					"ComboControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"font" : nexacro.FontObject("8pt \"맑은 고딕\""),
								"color" : nexacro.ColorObject("#000000"),
								"padding" : nexacro.PaddingObject("5px 10px 5px 10px"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"wordSpacing" : nexacro.CSSValueObject("normal")
							}
						}
					}
				}
			},
			"ListBox":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"padding" : nexacro.PaddingObject("0px 10px 0px 10px"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
	
					},
					"selected" :
					{
	
					},
					"disabled" :
					{
						"color" : nexacro.ColorObject("#999999")
					},
					"disabled_selected" :
					{
	
					}
				}
			},
			"ListBoxControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"padding" : nexacro.PaddingObject("0px 10px 0px 10px"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
	
					},
					"selected" :
					{
	
					},
					"disabled" :
					{
						"color" : nexacro.ColorObject("#999999")
					},
					"disabled_selected" :
					{
	
					}
				}
			}
		}
	},
	"ComboControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #999999"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"DatePickerControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"body":
	{
		"parent" :
		{
			"DatePickerControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					}
				}
			},
			"Grid":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					}
				}
			}
		}
	},
	"dayitem":
	{
		"parent" :
		{
			"body":
			{
				"parent" :
				{
					"DatePickerControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("1px solid #e5e5e5"),
								"font" : nexacro.FontObject("8pt \"맑은 고딕\""),
								"color" : nexacro.ColorObject("#000000"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
								"wordSpacing" : nexacro.CSSValueObject("normal")
							},
							"selected" :
							{
								"border" : nexacro.BorderObject("1px solid #0078d6"),
								"color" : nexacro.ColorObject("#ffffff")
							},
							"today" :
							{
								"border" : nexacro.BorderObject("1px solid #0078d6")
							},
							"trailingday" :
							{
								"border" : nexacro.BorderObject("1px solid #e5e5e5")
							},
							"disabled" :
							{
								"color" : nexacro.ColorObject("#999999")
							}
						}
					}
				}
			}
		}
	},
	"weekband":
	{
		"parent" :
		{
			"body":
			{
				"parent" :
				{
					"DatePickerControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("1px solid #e5e5e5, 0px none, 1px solid #e5e5e5, 0px none"),
								"padding" : nexacro.PaddingObject("2px"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"wordWrap" : "none",
								"wordSpacing" : nexacro.CSSValueObject("normal")
							}
						}
					}
				}
			}
		}
	},
	"weekitem":
	{
		"parent" :
		{
			"body":
			{
				"parent" :
				{
					"DatePickerControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"font" : nexacro.FontObject("8pt \"맑은 고딕\""),
								"color" : nexacro.ColorObject("#222222"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
								"wordSpacing" : nexacro.CSSValueObject("normal")
							},
							"disabled" :
							{
								"color" : nexacro.ColorObject("#999999")
							}
						}
					}
				}
			}
		}
	},
	"head":
	{
		"parent" :
		{
			"DatePickerControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none, 0px none, 1px solid #e5e5e5, 0px none"),
						"font" : nexacro.FontObject("12pt \"맑은 고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					}
				}
			},
			"Grid":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("1px solid #c6c6c6"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					}
				}
			}
		}
	},
	"monthspin":
	{
		"parent" :
		{
			"head":
			{
				"parent" :
				{
					"DatePickerControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("1px solid #cccccc"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
								"wordSpacing" : nexacro.CSSValueObject("normal")
							}
						}
					}
				}
			}
		}
	},
	"spinedit":
	{
		"parent" :
		{
			"monthspin":
			{
				"parent" :
				{
					"head":
					{
						"parent" :
						{
							"DatePickerControl":
							{
								"self" :
								{
									"enabled" :
									{
										"border" : nexacro.BorderObject("0px none"),
										"font" : nexacro.FontObject("8pt \"맑은 고딕\""),
										"color" : nexacro.ColorObject("#333333"),
										"letterSpacing" : nexacro.CSSValueObject("normal"),
										"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
										"wordSpacing" : nexacro.CSSValueObject("normal")
									},
									"disabled" :
									{
										"color" : nexacro.ColorObject("#999999")
									}
								}
							}
						}
					}
				}
			},
			"yearspin":
			{
				"parent" :
				{
					"head":
					{
						"parent" :
						{
							"DatePickerControl":
							{
								"self" :
								{
									"enabled" :
									{
										"border" : nexacro.BorderObject("0px none"),
										"font" : nexacro.FontObject("8pt \"맑은 고딕\""),
										"color" : nexacro.ColorObject("#333333"),
										"letterSpacing" : nexacro.CSSValueObject("normal"),
										"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
										"wordSpacing" : nexacro.CSSValueObject("normal")
									},
									"disabled" :
									{
										"color" : nexacro.ColorObject("#999999")
									}
								}
							}
						}
					}
				}
			},
			"Spin":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"padding" : nexacro.PaddingObject("0px 10px 0px 10px"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"disabled" :
					{
						"color" : nexacro.ColorObject("#999999")
					}
				}
			}
		}
	},
	"monthstatic":
	{
		"parent" :
		{
			"head":
			{
				"parent" :
				{
					"DatePickerControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none, 0px none, 1px solid #e5e5e5, 0px none"),
								"font" : nexacro.FontObject("12pt \"맑은 고딕\""),
								"color" : nexacro.ColorObject("#000000"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
								"wordWrap" : "none",
								"wordSpacing" : nexacro.CSSValueObject("normal")
							}
						}
					}
				}
			}
		}
	},
	"nextbutton":
	{
		"parent" :
		{
			"head":
			{
				"parent" :
				{
					"DatePickerControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"icon" : nexacro.UrlObject("URL(\"theme://images/btn_next_N.png\")"),
								"padding" : nexacro.PaddingObject("5px"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"iconPosition" : "left",
								"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
								"wordWrap" : "none",
								"wordSpacing" : nexacro.CSSValueObject("normal")
							},
							"mouseover" :
							{
								"border" : nexacro.BorderObject("0px none")
							},
							"pushed" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"icon" : nexacro.UrlObject("url(\"theme://images/btn_next_P.png\")")
							}
						}
					}
				}
			}
		}
	},
	"prevbutton":
	{
		"parent" :
		{
			"head":
			{
				"parent" :
				{
					"DatePickerControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"icon" : nexacro.UrlObject("URL(\"theme://images/btn_prev_N.png\")"),
								"padding" : nexacro.PaddingObject("5px"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"iconPosition" : "left",
								"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
								"wordWrap" : "none",
								"wordSpacing" : nexacro.CSSValueObject("normal")
							},
							"mouseover" :
							{
								"border" : nexacro.BorderObject("0px none")
							},
							"pushed" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"icon" : nexacro.UrlObject("url(\"theme://images/btn_prev_P.png\")")
							}
						}
					}
				}
			}
		}
	},
	"yearspin":
	{
		"parent" :
		{
			"head":
			{
				"parent" :
				{
					"DatePickerControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("1px solid #cccccc"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
								"wordSpacing" : nexacro.CSSValueObject("normal")
							}
						}
					}
				}
			}
		}
	},
	"yearstatic":
	{
		"parent" :
		{
			"head":
			{
				"parent" :
				{
					"DatePickerControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none, 0px none, 1px solid #e5e5e5, 0px none"),
								"font" : nexacro.FontObject("12pt \"맑은 고딕\""),
								"color" : nexacro.ColorObject("#000000"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
								"wordWrap" : "none",
								"wordSpacing" : nexacro.CSSValueObject("normal")
							}
						}
					}
				}
			}
		}
	},
	"Div":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"color" : nexacro.ColorObject("#000000"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"mouseover" :
			{
				"border" : nexacro.BorderObject("1px solid #99c9ef")
			},
			"disabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"color" : nexacro.ColorObject("#999999")
			}
		}
	},
	"Edit":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #999999"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#000000"),
				"padding" : nexacro.PaddingObject("0px 10px 0px 10px"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"focused" :
			{
				"border" : nexacro.BorderObject("1px solid #0078d6")
			},
			"readonly" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc")
			},
			"mouseover" :
			{
				"border" : nexacro.BorderObject("1px solid #0078d6")
			},
			"disabled" :
			{
				"color" : nexacro.ColorObject("#999999"),
				"border" : nexacro.BorderObject("1px solid #cccccc")
			}
		}
	},
	"FileDownload":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#000000"),
				"padding" : nexacro.PaddingObject("0px 10px 0px 10px"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"iconPosition" : "left",
				"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordWrap" : "none",
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"mouseover" :
			{
				"border" : nexacro.BorderObject("1px solid #666666")
			},
			"pushed" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"color" : nexacro.ColorObject("#ffffff")
			},
			"disabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"color" : nexacro.ColorObject("#999999")
			}
		}
	},
	"FileUpload":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"fileuploaditembutton":
	{
		"parent" :
		{
			"fileuploaditem":
			{
				"parent" :
				{
					"FileUpload":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("1px solid #cccccc"),
								"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
								"color" : nexacro.ColorObject("#000000"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"iconPosition" : "left",
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
								"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
								"wordWrap" : "none",
								"wordSpacing" : nexacro.CSSValueObject("normal")
							},
							"mouseover" :
							{
								"border" : nexacro.BorderObject("1px solid #666666"),
								"color" : nexacro.ColorObject("#000000")
							},
							"disabled" :
							{
								"border" : nexacro.BorderObject("1px solid #cccccc"),
								"color" : nexacro.ColorObject("#999999")
							}
						}
					}
				}
			}
		}
	},
	"fileuploaditemedit":
	{
		"parent" :
		{
			"fileuploaditem":
			{
				"parent" :
				{
					"FileUpload":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("1px solid #cccccc"),
								"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
								"color" : nexacro.ColorObject("#666666"),
								"padding" : nexacro.PaddingObject("0px 5px 0px 10px"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"wordSpacing" : nexacro.CSSValueObject("normal")
							},
							"mouseover" :
							{
								"border" : nexacro.BorderObject("1px solid #0078d6")
							},
							"disabled" :
							{
								"border" : nexacro.BorderObject("1px solid #e5e5e5")
							}
						}
					}
				}
			}
		}
	},
	"FlashPlayer":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#666666"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"FlashPlayerControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#666666"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"Form":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"FrameSet":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none")
			}
		}
	},
	"Grid":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"cell":
	{
		"class" :
		{
			"oddcell":
			{
				"parent" :
				{
					"row":
					{
						"parent" :
						{
							"body":
							{
								"parent" :
								{
									"Grid":
									{
										"self" :
										{
											"enabled" :
											{
				
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},
		"parent" :
		{
			"row":
			{
				"parent" :
				{
					"body":
					{
						"parent" :
						{
							"Grid":
							{
								"self" :
								{
									"enabled" :
									{
										"border" : nexacro.BorderObject("1px solid #e5e5e5"),
										"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
										"color" : nexacro.ColorObject("#000000"),
										"padding" : nexacro.PaddingObject("2px"),
										"letterSpacing" : nexacro.CSSValueObject("normal"),
										"wordWrap" : "none",
										"wordSpacing" : nexacro.CSSValueObject("normal")
									},
									"selected" :
									{
			
									}
								}
							}
						}
					},
					"head":
					{
						"parent" :
						{
							"Grid":
							{
								"self" :
								{
									"enabled" :
									{
										"border" : nexacro.BorderObject("1px solid #c6c6c6"),
										"font" : nexacro.FontObject("11pt \"맑은 고딕\""),
										"color" : nexacro.ColorObject("#000000"),
										"letterSpacing" : nexacro.CSSValueObject("normal"),
										"wordWrap" : "none",
										"wordSpacing" : nexacro.CSSValueObject("normal")
									}
								}
							}
						}
					},
					"summary":
					{
						"parent" :
						{
							"Grid":
							{
								"self" :
								{
									"enabled" :
									{
										"border" : nexacro.BorderObject("1px solid #e5e5e5"),
										"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
										"color" : nexacro.ColorObject("#000000"),
										"letterSpacing" : nexacro.CSSValueObject("normal"),
										"wordWrap" : "none",
										"wordSpacing" : nexacro.CSSValueObject("normal")
									}
								}
							}
						}
					}
				}
			}
		}
	},
	"cellbutton":
	{
		"parent" :
		{
			"cell":
			{
				"parent" :
				{
					"row":
					{
						"parent" :
						{
							"body":
							{
								"parent" :
								{
									"Grid":
									{
										"self" :
										{
											"enabled" :
											{
												"border" : nexacro.BorderObject("1px solid #cccccc"),
												"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
												"color" : nexacro.ColorObject("#000000"),
												"textPadding" : nexacro.PaddingObject("0px 10px 0px 10px"),
												"letterSpacing" : nexacro.CSSValueObject("normal"),
												"iconPosition" : "left",
												"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
												"wordWrap" : "none",
												"wordSpacing" : nexacro.CSSValueObject("normal")
											},
											"mouseover" :
											{
												"border" : nexacro.BorderObject("1px solid #666666")
											},
											"focused" :
											{
												"border" : nexacro.BorderObject("2px solid #0078d6")
											},
											"pushed" :
											{
												"border" : nexacro.BorderObject("0px none"),
												"color" : nexacro.ColorObject("#ffffff")
											},
											"selected" :
											{
												"border" : nexacro.BorderObject("2px solid #0078d6")
											},
											"disabled" :
											{
												"border" : nexacro.BorderObject("0px none"),
												"color" : nexacro.ColorObject("#999999")
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	"cellcheckbox":
	{
		"parent" :
		{
			"cell":
			{
				"parent" :
				{
					"row":
					{
						"parent" :
						{
							"body":
							{
								"parent" :
								{
									"Grid":
									{
										"self" :
										{
											"enabled" :
											{
												"icon" : nexacro.UrlObject("URL(\"theme://images/img_check_NN.png\")"),
												"letterSpacing" : nexacro.CSSValueObject("normal"),
												"iconPosition" : "left",
												"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
												"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
												"wordSpacing" : nexacro.CSSValueObject("normal")
											},
											"mouseover" :
											{
												"icon" : nexacro.UrlObject("URL(\"theme://images/img_check_ON.png\")")
											},
											"selected" :
											{
												"icon" : nexacro.UrlObject("URL(\"theme://images/img_check_NS.png\")")
											},
											"disabled" :
											{
												"icon" : nexacro.UrlObject("URL(\"theme://images/img_check_DN.png\")")
											},
											"mouseover_selected" :
											{
												"icon" : nexacro.UrlObject("URL(\"theme://images/img_check_OS.png\")")
											},
											"disabled_selected" :
											{
												"icon" : nexacro.UrlObject("URL(\"theme://images/img_check_DS.png\")")
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	"celledit":
	{
		"parent" :
		{
			"cell":
			{
				"parent" :
				{
					"row":
					{
						"parent" :
						{
							"body":
							{
								"parent" :
								{
									"Grid":
									{
										"self" :
										{
											"enabled" :
											{
												"border" : nexacro.BorderObject("1px solid #999999"),
												"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
												"color" : nexacro.ColorObject("#000000"),
												"padding" : nexacro.PaddingObject("0px 10px 0px 10px"),
												"letterSpacing" : nexacro.CSSValueObject("normal"),
												"wordSpacing" : nexacro.CSSValueObject("normal")
											},
											"focused" :
											{
												"border" : nexacro.BorderObject("1px solid #0078d6")
											},
											"readonly" :
											{
												"border" : nexacro.BorderObject("1px solid #cccccc")
											},
											"mouseover" :
											{
												"border" : nexacro.BorderObject("1px solid #0078d6")
											},
											"disabled" :
											{
												"color" : nexacro.ColorObject("#999999"),
												"border" : nexacro.BorderObject("1px solid #cccccc")
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	"cellmaskEdit":
	{
		"parent" :
		{
			"cell":
			{
				"parent" :
				{
					"row":
					{
						"parent" :
						{
							"body":
							{
								"parent" :
								{
									"Grid":
									{
										"self" :
										{
											"disabled" :
											{
												"color" : nexacro.ColorObject("#999999"),
												"border" : nexacro.BorderObject("1px solid #cccccc")
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	"cellmaskedit":
	{
		"parent" :
		{
			"cell":
			{
				"parent" :
				{
					"row":
					{
						"parent" :
						{
							"body":
							{
								"parent" :
								{
									"Grid":
									{
										"self" :
										{
											"enabled" :
											{
												"border" : nexacro.BorderObject("1px solid #999999"),
												"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
												"color" : nexacro.ColorObject("#000000"),
												"padding" : nexacro.PaddingObject("0px 10px 0px 10px"),
												"letterSpacing" : nexacro.CSSValueObject("normal"),
												"wordSpacing" : nexacro.CSSValueObject("normal")
											},
											"focused" :
											{
												"border" : nexacro.BorderObject("1px solid #0078d6")
											},
											"readonly" :
											{
												"border" : nexacro.BorderObject("1px solid #cccccc")
											},
											"mouseover" :
											{
												"border" : nexacro.BorderObject("1px solid #0078d6")
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	"celltextarea":
	{
		"parent" :
		{
			"cell":
			{
				"parent" :
				{
					"row":
					{
						"parent" :
						{
							"body":
							{
								"parent" :
								{
									"Grid":
									{
										"self" :
										{
											"focused" :
											{
												"border" : nexacro.BorderObject("1px solid #0078d6")
											},
											"readonly" :
											{
												"border" : nexacro.BorderObject("1px solid #cccccc")
											},
											"mouseover" :
											{
												"border" : nexacro.BorderObject("1px solid #0078d6")
											},
											"disabled" :
											{
												"color" : nexacro.ColorObject("#999999"),
												"border" : nexacro.BorderObject("1px solid #cccccc")
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	"treeitembutton":
	{
		"parent" :
		{
			"celltreeitem":
			{
				"parent" :
				{
					"cell":
					{
						"parent" :
						{
							"row":
							{
								"parent" :
								{
									"body":
									{
										"parent" :
										{
											"Grid":
											{
												"self" :
												{
													"expand" :
													{
														"border" : nexacro.BorderObject("0px none"),
														"icon" : nexacro.UrlObject("URL(\"theme://images/img_TreeCollapse.png\")")
													},
													"collapse" :
													{
														"border" : nexacro.BorderObject("0px none"),
														"icon" : nexacro.UrlObject("URL(\"theme://images/img_TreeExpand.png\")")
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	"treeitemcheckbox":
	{
		"parent" :
		{
			"celltreeitem":
			{
				"parent" :
				{
					"cell":
					{
						"parent" :
						{
							"row":
							{
								"parent" :
								{
									"body":
									{
										"parent" :
										{
											"Grid":
											{
												"self" :
												{
													"enabled" :
													{
														"icon" : nexacro.UrlObject("URL(\"theme://images/img_TreeCheck_N.png\")"),
														"letterSpacing" : nexacro.CSSValueObject("normal"),
														"iconPosition" : "left",
														"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
														"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
														"wordSpacing" : nexacro.CSSValueObject("normal")
													},
													"selected" :
													{
														"icon" : nexacro.UrlObject("URL(\"theme://images/img_TreeCheck_S.png\")")
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	"treeitemimage":
	{
		"parent" :
		{
			"celltreeitem":
			{
				"parent" :
				{
					"cell":
					{
						"parent" :
						{
							"row":
							{
								"parent" :
								{
									"body":
									{
										"parent" :
										{
											"Grid":
											{
												"self" :
												{
													"leaf" :
													{
														"icon" : nexacro.UrlObject("URL(\"theme://images/img_TreeItem.png\")")
													},
													"collapse" :
													{
														"icon" : nexacro.UrlObject("URL(\"theme://images/img_TreeClose.png\")")
													},
													"expand" :
													{
														"icon" : nexacro.UrlObject("URL(\"theme://images/img_TreeOpen.png\")")
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	"nexatreeline":
	{
		"parent" :
		{
			"cell":
			{
				"parent" :
				{
					"row":
					{
						"parent" :
						{
							"body":
							{
								"parent" :
								{
									"Grid":
									{
										"self" :
										{
											"enabled" :
											{
												"border" : nexacro.BorderObject("1px dotted #999999"),
												"letterSpacing" : nexacro.CSSValueObject("normal"),
												"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
												"wordWrap" : "none",
												"wordSpacing" : nexacro.CSSValueObject("normal")
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	"summary":
	{
		"parent" :
		{
			"Grid":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					}
				}
			}
		}
	},
	"groupboxcontents":
	{
		"parent" :
		{
			"GroupBox":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("1px solid #e5e5e5"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"disabled" :
					{
						"border" : nexacro.BorderObject("1px solid #f2f2f2")
					}
				}
			}
		}
	},
	"groupboxtitle":
	{
		"parent" :
		{
			"GroupBox":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"color" : nexacro.ColorObject("#000000"),
						"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
						"icon" : nexacro.UrlObject("URL(\"theme://images/img_groupboxtit.png\")"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 5px"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"disabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"color" : nexacro.ColorObject("#999999"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/img_groupboxtit_D.png\")")
					}
				}
			}
		}
	},
	"HFrameSet":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none")
			}
		}
	},
	"HScrollBarControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
			}
		}
	},
	"decbutton":
	{
		"parent" :
		{
			"HScrollBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_hdec_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_hdec_N.png\")")
					},
					"pushed" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_hdec_P.png\")")
					},
					"disabled" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_hdec_D.png\")")
					}
				}
			},
			"VScrollBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_vdec_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_vdec_N.png\")")
					},
					"pushed" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_vdec_P.png\")")
					},
					"disabled" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_vdec_D.png\")")
					}
				}
			}
		}
	},
	"incbutton":
	{
		"parent" :
		{
			"HScrollBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_hinc_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_hinc_N.png\")")
					},
					"pushed" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_hinc_P.png\")")
					},
					"disabled" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_hinc_D.png\")")
					}
				}
			},
			"VScrollBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_vinc_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_vinc_N.png\")")
					},
					"pushed" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_vinc_P.png\")")
					},
					"disabled" :
					{
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_vinc_D.png\")")
					}
				}
			}
		}
	},
	"trackbar":
	{
		"parent" :
		{
			"HScrollBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("2px solid transparent"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
	
					},
					"pushed" :
					{
	
					}
				}
			},
			"HScrollIndicatorControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("2px solid transparent"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
	
					},
					"pushed" :
					{
	
					}
				}
			},
			"VScrollBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("2px solid transparent"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
	
					},
					"pushed" :
					{
	
					}
				}
			},
			"VScrollIndicatorControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("2px solid transparent"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
	
					},
					"pushed" :
					{
	
					}
				}
			}
		}
	},
	"HScrollIndicatorControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordWrap" : "none",
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"ImageViewer":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"mouseover" :
			{
				"border" : nexacro.BorderObject("1px solid #99c9ef")
			},
			"disabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5")
			}
		}
	},
	"imagetext":
	{
		"parent" :
		{
			"ImageViewer":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"color" : nexacro.ColorObject("#000000"),
						"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"disabled" :
					{
						"color" : nexacro.ColorObject("#999999")
					}
				}
			}
		}
	},
	"ListBox":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"disabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc")
			}
		}
	},
	"ListBoxControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"disabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc")
			}
		}
	},
	"MainFrame":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #0078d6"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"deactivate" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5")
			}
		}
	},
	"MaskEdit":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #999999"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#000000"),
				"padding" : nexacro.PaddingObject("0px 10px 0px 10px"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"focused" :
			{
				"border" : nexacro.BorderObject("1px solid #0078d6")
			},
			"readonly" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc")
			},
			"mouseover" :
			{
				"border" : nexacro.BorderObject("1px solid #0078d6")
			},
			"disabled" :
			{
				"color" : nexacro.ColorObject("#999999"),
				"border" : nexacro.BorderObject("1px solid #cccccc")
			}
		}
	},
	"Menu":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"menuitem":
	{
		"parent" :
		{
			"Menu":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"padding" : nexacro.PaddingObject("0px 20px 0px 20px"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
	
					},
					"selected" :
					{
	
					}
				}
			}
		}
	},
	"Plugin":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#666666"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"PluginControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#666666"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"PopupDiv":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"color" : nexacro.ColorObject("#000000"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"mouseover" :
			{
				"border" : nexacro.BorderObject("1px solid #99c9ef")
			},
			"disabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"color" : nexacro.ColorObject("#999999")
			}
		}
	},
	"PopupMenu":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"popupmenuitem":
	{
		"parent" :
		{
			"PopupMenu":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
	
					},
					"selected" :
					{
	
					}
				}
			},
			"PopupMenuControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
	
					},
					"selected" :
					{
	
					}
				}
			}
		}
	},
	"popupmenuitemcheckbox":
	{
		"parent" :
		{
			"popupmenuitem":
			{
				"parent" :
				{
					"PopupMenu":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"icon" : nexacro.UrlObject("URL(\"theme://images/img_check_NS.png\")"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
							}
						}
					},
					"PopupMenuControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"icon" : nexacro.UrlObject("URL(\"theme://images/img_check_NS.png\")"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
							}
						}
					}
				}
			}
		}
	},
	"popupmenuitemexpandimage":
	{
		"parent" :
		{
			"popupmenuitem":
			{
				"parent" :
				{
					"PopupMenu":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"icon" : nexacro.UrlObject("URL(\"theme://images/btn_hinc_N.png\")"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
							}
						}
					},
					"PopupMenuControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"icon" : nexacro.UrlObject("URL(\"theme://images/btn_hinc_N.png\")"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
							}
						}
					}
				}
			}
		}
	},
	"popupmenuitemhotkeytext":
	{
		"parent" :
		{
			"popupmenuitem":
			{
				"parent" :
				{
					"PopupMenu":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"font" : nexacro.FontObject("8pt \"맑은 고딕\""),
								"color" : nexacro.ColorObject("#7a7a7a"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
								"wordWrap" : "none",
								"wordSpacing" : nexacro.CSSValueObject("normal")
							}
						}
					},
					"PopupMenuControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"font" : nexacro.FontObject("8pt \"맑은 고딕\""),
								"color" : nexacro.ColorObject("#7a7a7a"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
								"wordWrap" : "none",
								"wordSpacing" : nexacro.CSSValueObject("normal")
							}
						}
					}
				}
			}
		}
	},
	"popupmenuitemicon":
	{
		"parent" :
		{
			"popupmenuitem":
			{
				"parent" :
				{
					"PopupMenu":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"icon" : nexacro.UrlObject("URL(\"theme://images/pop_menu_icon.png\")"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
							}
						}
					},
					"PopupMenuControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"icon" : nexacro.UrlObject("URL(\"theme://images/pop_menu_icon.png\")"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
							}
						}
					}
				}
			}
		}
	},
	"popupmenuitemtext":
	{
		"parent" :
		{
			"popupmenuitem":
			{
				"parent" :
				{
					"PopupMenu":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
								"color" : nexacro.ColorObject("#000000"),
								"padding" : nexacro.PaddingObject("0px 10px 0px 10px"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"wordWrap" : "none",
								"wordSpacing" : nexacro.CSSValueObject("normal")
							}
						}
					},
					"PopupMenuControl":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
								"color" : nexacro.ColorObject("#000000"),
								"padding" : nexacro.PaddingObject("0px 10px 0px 10px"),
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"wordWrap" : "none",
								"wordSpacing" : nexacro.CSSValueObject("normal")
							}
						}
					}
				}
			}
		}
	},
	"PopupMenuControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"ProgressBar":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
			},
			"disabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc")
			}
		}
	},
	"progressbaritem":
	{
		"parent" :
		{
			"ProgressBar":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
					},
					"disabled" :
					{
	
					}
				}
			},
			"ProgressBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
					},
					"disabled" :
					{
	
					}
				}
			},
			"progressbar":
			{
				"parent" :
				{
					"StatusBarControl":
					{
						"self" :
						{
							"enabled" :
							{
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
							}
						}
					}
				}
			}
		}
	},
	"progressbartext":
	{
		"parent" :
		{
			"ProgressBar":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"font" : nexacro.FontObject("8pt \"맑은고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					}
				}
			},
			"ProgressBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"font" : nexacro.FontObject("8pt \"맑은고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					}
				}
			}
		}
	},
	"ProgressBarControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
			},
			"disabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc")
			}
		}
	},
	"Radio":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"radioitem":
	{
		"parent" :
		{
			"Radio":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 5px"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/img_Radio_NN.png\")"),
						"iconPosition" : "left",
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/img_Radio_ON.png\")")
					},
					"selected" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/img_Radio_NS.png\")")
					},
					"disabled" :
					{
						"color" : nexacro.ColorObject("#999999"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/img_Radio_DN.png\")")
					},
					"mouseover_selected" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/img_Radio_OS.png\")")
					},
					"disabled_selected" :
					{
						"color" : nexacro.ColorObject("#999999"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/img_Radio_DS.png\")")
					}
				}
			}
		}
	},
	"Sketch":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#666666"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"disabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"color" : nexacro.ColorObject("#999999")
			}
		}
	},
	"Spin":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #999999"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"readonly" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc")
			},
			"mouseover" :
			{
				"border" : nexacro.BorderObject("1px solid #0078d6")
			},
			"pushed" :
			{
				"border" : nexacro.BorderObject("1px solid #0078d6")
			},
			"disabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc")
			}
		}
	},
	"Static":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#000000"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordWrap" : "none",
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"disabled" :
			{
				"color" : nexacro.ColorObject("#999999")
			}
		}
	},
	"StaticControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#000000"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordWrap" : "none",
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"disabled" :
			{
				"color" : nexacro.ColorObject("#999999")
			}
		}
	},
	"StatusBarControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 10px"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"progressbar":
	{
		"parent" :
		{
			"StatusBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("1px solid #e5e5e5"),
						"color" : nexacro.ColorObject("#ffffff"),
						"padding" : nexacro.PaddingObject("5px 5px 5px 5px"),
						"letterSpacing" : nexacro.CSSValueObject("normal")
					}
				}
			}
		}
	},
	"resizegrip":
	{
		"parent" :
		{
			"StatusBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/img_grip.png\")"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
					}
				}
			}
		}
	},
	"statustext":
	{
		"parent" :
		{
			"StatusBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"font" : nexacro.FontObject("8pt \"맑은 고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					}
				}
			}
		}
	},
	"StepControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"padding" : nexacro.PaddingObject("0px 0px 10px 0px")
			}
		}
	},
	"stepitem":
	{
		"parent" :
		{
			"StepControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/img_Step_NN.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"selected" :
					{
						"icon" : nexacro.UrlObject("URL(\"theme://images/img_Step_NS.png\")")
					}
				}
			}
		}
	},
	"Tab":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"tabbuttonitem":
	{
		"parent" :
		{
			"Tab":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("1px solid #cccccc"),
						"padding" : nexacro.PaddingObject("3px 10px 3px 10px"),
						"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"iconPosition" : "left",
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"border" : nexacro.BorderObject("1px solid #4ca0e2")
					},
					"selected" :
					{
						"border" : nexacro.BorderObject("1px solid #cccccc, 1px solid #cccccc, 1px solid transparent, 1px solid #cccccc"),
						"color" : nexacro.ColorObject("#000000")
					},
					"disabled" :
					{
						"border" : nexacro.BorderObject("1px solid #e5e5e5"),
						"color" : nexacro.ColorObject("#999999")
					},
					"focused_selected" :
					{
						"border" : nexacro.BorderObject("1px solid #cccccc, 1px solid #cccccc, 1px solid transparent, 1px solid #cccccc"),
						"color" : nexacro.ColorObject("#000000")
					}
				}
			}
		}
	},
	"extrabutton":
	{
		"parent" :
		{
			"tabbuttonitem":
			{
				"parent" :
				{
					"Tab":
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none"),
								"icon" : nexacro.UrlObject("url(\"theme://images/btn_tabExtra_N.png\")"),
								"iconPosition" : "right",
								"letterSpacing" : nexacro.CSSValueObject("normal"),
								"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
								"textPadding" : nexacro.PaddingObject("0px 0px 0px 0px"),
								"wordWrap" : "none",
								"wordSpacing" : nexacro.CSSValueObject("normal")
							},
							"mouseover" :
							{
								"icon" : nexacro.UrlObject("url(\"theme://images/btn_tabExtra_O.png\")")
							},
							"disabled" :
							{
								"icon" : nexacro.UrlObject("url(\"theme://images/btn_tabExtra_D.png\")")
							}
						}
					}
				}
			}
		}
	},
	"tabpage":
	{
		"parent" :
		{
			"Tab":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("1px solid #cccccc"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"wordSpacing" : nexacro.CSSValueObject("normal")
					}
				}
			}
		}
	},
	"TextArea":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #999999"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#000000"),
				"padding" : nexacro.PaddingObject("10px 10px 10px 10px"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"wordWrap" : "none",
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"focused" :
			{
				"border" : nexacro.BorderObject("1px solid #0078d6")
			},
			"readonly" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc")
			},
			"mouseover" :
			{
				"border" : nexacro.BorderObject("1px solid #0078d6")
			},
			"disabled" :
			{
				"color" : nexacro.ColorObject("#999999"),
				"border" : nexacro.BorderObject("1px solid #cccccc")
			}
		}
	},
	"TextAreaControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #999999"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#000000"),
				"padding" : nexacro.PaddingObject("10px 10px 10px 10px"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"wordWrap" : "none",
				"wordSpacing" : nexacro.CSSValueObject("normal")
			},
			"focused" :
			{
				"border" : nexacro.BorderObject("1px solid #0078d6")
			},
			"readonly" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc")
			},
			"mouseover" :
			{
				"border" : nexacro.BorderObject("1px solid #0078d6")
			},
			"disabled" :
			{
				"color" : nexacro.ColorObject("#999999"),
				"border" : nexacro.BorderObject("1px solid #cccccc")
			}
		}
	},
	"TileFrameSet":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"TitleBarControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #cccccc"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 10px"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"closebutton":
	{
		"parent" :
		{
			"TitleBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_close_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_close_O.png\")")
					},
					"pushed" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_close_O.png\")")
					},
					"disabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_close_D.png\")")
					}
				}
			}
		}
	},
	"maxbutton":
	{
		"parent" :
		{
			"TitleBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("url(\"theme://images/btn_max_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"border" : nexacro.BorderObject("0px none")
					},
					"pushed" :
					{
						"border" : nexacro.BorderObject("0px none")
					},
					"disabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_max_D.png\")")
					}
				}
			}
		}
	},
	"minbutton":
	{
		"parent" :
		{
			"TitleBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_min_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"border" : nexacro.BorderObject("0px none")
					},
					"pushed" :
					{
						"border" : nexacro.BorderObject("0px none")
					},
					"disabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_min_D.png\")")
					}
				}
			}
		}
	},
	"normalbutton":
	{
		"parent" :
		{
			"TitleBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_normal_N.png\")"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"mouseover" :
					{
						"border" : nexacro.BorderObject("0px none")
					},
					"pushed" :
					{
						"border" : nexacro.BorderObject("0px none")
					},
					"disabled" :
					{
						"border" : nexacro.BorderObject("0px none"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/btn_normal_D.png\")")
					}
				}
			}
		}
	},
	"titleicon":
	{
		"parent" :
		{
			"TitleBarControl":
			{
				"self" :
				{
					"enabled" :
					{
						"font" : nexacro.FontObject("bold 10pt \"맑은 고딕\""),
						"color" : nexacro.ColorObject("#000000"),
						"icon" : nexacro.UrlObject("URL(\"theme://images/ico_title.png\")"),
						"iconPosition" : "left",
						"textPadding" : nexacro.PaddingObject("0px 0px 0px 10px"),
						"letterSpacing" : nexacro.CSSValueObject("normal"),
						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
						"wordWrap" : "none",
						"wordSpacing" : nexacro.CSSValueObject("normal")
					},
					"deactivate" :
					{
						"color" : nexacro.ColorObject("#adadad")
					}
				}
			}
		}
	},
	"VFrameSet":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"VScrollBarControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
			}
		}
	},
	"VScrollIndicatorControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("0px none"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordWrap" : "none",
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"WebBrowser":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#666666"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	},
	"WebBrowserControl":
	{
		"self" :
		{
			"enabled" :
			{
				"border" : nexacro.BorderObject("1px solid #e5e5e5"),
				"font" : nexacro.FontObject("10pt \"맑은 고딕\""),
				"color" : nexacro.ColorObject("#666666"),
				"letterSpacing" : nexacro.CSSValueObject("normal"),
				"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
				"wordSpacing" : nexacro.CSSValueObject("normal")
			}
		}
	}
		}
		);

		var imgcache = nexacro._getImageCacheMaps();
		imgcache[nexacro._getImageLocation("theme://images/ico_title.png")] = {width:14 ,height:14};
imgcache[nexacro._getImageLocation("theme://images/btn_min_N.png")] = {width:14 ,height:12};
imgcache[nexacro._getImageLocation("theme://images/btn_max_N.png")] = {width:12 ,height:12};
imgcache[nexacro._getImageLocation("theme://images/btn_normal_N.png")] = {width:12 ,height:12};
imgcache[nexacro._getImageLocation("theme://images/btn_close_N.png")] = {width:12 ,height:12};
imgcache[nexacro._getImageLocation("theme://images/btn_close_O.png")] = {width:12 ,height:12};
imgcache[nexacro._getImageLocation("theme://images/btn_close_D.png")] = {width:12 ,height:12};
imgcache[nexacro._getImageLocation("theme://images/btn_max_D.png")] = {width:12 ,height:12};
imgcache[nexacro._getImageLocation("theme://images/btn_min_D.png")] = {width:14 ,height:12};
imgcache[nexacro._getImageLocation("theme://images/btn_normal_D.png")] = {width:12 ,height:12};
imgcache[nexacro._getImageLocation("theme://images/img_grip.png")] = {width:11 ,height:11};
imgcache[nexacro._getImageLocation("theme://images/btn_SpinUp_N.png")] = {width:8 ,height:5};
imgcache[nexacro._getImageLocation("theme://images/btn_SpinUp_P.png")] = {width:8 ,height:5};
imgcache[nexacro._getImageLocation("theme://images/btn_SpinUp_D.png")] = {width:8 ,height:5};
imgcache[nexacro._getImageLocation("theme://images/btn_SpinDown_N.png")] = {width:8 ,height:5};
imgcache[nexacro._getImageLocation("theme://images/btn_SpinDown_P.png")] = {width:8 ,height:5};
imgcache[nexacro._getImageLocation("theme://images/btn_SpinDown_D.png")] = {width:8 ,height:5};
imgcache[nexacro._getImageLocation("theme://images/btn_tabExtra_N.png")] = {width:10 ,height:10};
imgcache[nexacro._getImageLocation("theme://images/btn_tabExtra_O.png")] = {width:10 ,height:10};
imgcache[nexacro._getImageLocation("theme://images/btn_tabExtra_D.png")] = {width:10 ,height:10};
imgcache[nexacro._getImageLocation("theme://images/btn_tabspinup_P.png")] = {width:5 ,height:7};
imgcache[nexacro._getImageLocation("theme://images/btn_tabspindown_P.png")] = {width:5 ,height:7};
imgcache[nexacro._getImageLocation("theme://images/btn_tabspinup_N.png")] = {width:5 ,height:7};
imgcache[nexacro._getImageLocation("theme://images/btn_tabspindown_N.png")] = {width:5 ,height:7};
imgcache[nexacro._getImageLocation("theme://images/img_check_NN.png")] = {width:18 ,height:18};
imgcache[nexacro._getImageLocation("theme://images/img_check_NS.png")] = {width:18 ,height:18};
imgcache[nexacro._getImageLocation("theme://images/img_check_ON.png")] = {width:18 ,height:18};
imgcache[nexacro._getImageLocation("theme://images/img_check_OS.png")] = {width:18 ,height:18};
imgcache[nexacro._getImageLocation("theme://images/img_check_DN.png")] = {width:18 ,height:18};
imgcache[nexacro._getImageLocation("theme://images/img_check_DS.png")] = {width:18 ,height:18};
imgcache[nexacro._getImageLocation("theme://images/img_Radio_NN.png")] = {width:18 ,height:18};
imgcache[nexacro._getImageLocation("theme://images/img_Radio_NS.png")] = {width:18 ,height:18};
imgcache[nexacro._getImageLocation("theme://images/img_Radio_ON.png")] = {width:18 ,height:18};
imgcache[nexacro._getImageLocation("theme://images/img_Radio_OS.png")] = {width:18 ,height:18};
imgcache[nexacro._getImageLocation("theme://images/img_Radio_DN.png")] = {width:18 ,height:18};
imgcache[nexacro._getImageLocation("theme://images/img_Radio_DS.png")] = {width:18 ,height:18};
imgcache[nexacro._getImageLocation("theme://images/btn_CalDrop_N.png")] = {width:15 ,height:16};
imgcache[nexacro._getImageLocation("theme://images/btn_CalDrop_P.png")] = {width:15 ,height:16};
imgcache[nexacro._getImageLocation("theme://images/btn_CalDrop_D.png")] = {width:15 ,height:16};
imgcache[nexacro._getImageLocation("theme://images/btn_next_N.png")] = {width:11 ,height:16};
imgcache[nexacro._getImageLocation("theme://images/btn_prev_N.png")] = {width:11 ,height:16};
imgcache[nexacro._getImageLocation("theme://images/btn_prev_P.png")] = {width:11 ,height:16};
imgcache[nexacro._getImageLocation("theme://images/btn_next_P.png")] = {width:11 ,height:16};
imgcache[nexacro._getImageLocation("theme://images/btn_CalHeadSpinUp_N.png")] = {width:6 ,height:4};
imgcache[nexacro._getImageLocation("theme://images/btn_CalHeadSpinUp_P.png")] = {width:6 ,height:4};
imgcache[nexacro._getImageLocation("theme://images/btn_CalHeadSpinDown_N.png")] = {width:6 ,height:4};
imgcache[nexacro._getImageLocation("theme://images/btn_CalHeadSpinDown_P.png")] = {width:6 ,height:4};
imgcache[nexacro._getImageLocation("theme://images/btn_vinc_N.png")] = {width:10 ,height:8};
imgcache[nexacro._getImageLocation("theme://images/btn_vinc_P.png")] = {width:10 ,height:8};
imgcache[nexacro._getImageLocation("theme://images/btn_vinc_D.png")] = {width:10 ,height:8};
imgcache[nexacro._getImageLocation("theme://images/btn_vdec_N.png")] = {width:10 ,height:8};
imgcache[nexacro._getImageLocation("theme://images/btn_vdec_P.png")] = {width:10 ,height:8};
imgcache[nexacro._getImageLocation("theme://images/btn_vdec_D.png")] = {width:10 ,height:8};
imgcache[nexacro._getImageLocation("theme://images/btn_hinc_N.png")] = {width:8 ,height:10};
imgcache[nexacro._getImageLocation("theme://images/btn_hinc_P.png")] = {width:8 ,height:10};
imgcache[nexacro._getImageLocation("theme://images/btn_hinc_D.png")] = {width:8 ,height:10};
imgcache[nexacro._getImageLocation("theme://images/btn_hdec_N.png")] = {width:8 ,height:10};
imgcache[nexacro._getImageLocation("theme://images/btn_hdec_P.png")] = {width:8 ,height:10};
imgcache[nexacro._getImageLocation("theme://images/btn_hdec_D.png")] = {width:8 ,height:10};
imgcache[nexacro._getImageLocation("theme://images/btn_drop_N.png")] = {width:14 ,height:10};
imgcache[nexacro._getImageLocation("theme://images/btn_drop_P.png")] = {width:14 ,height:10};
imgcache[nexacro._getImageLocation("theme://images/btn_drop_D.png")] = {width:14 ,height:10};
imgcache[nexacro._getImageLocation("theme://images/img_Step_NN.png")] = {width:12 ,height:12};
imgcache[nexacro._getImageLocation("theme://images/img_Step_NS.png")] = {width:12 ,height:12};
imgcache[nexacro._getImageLocation("theme://images/pop_menu_icon.png")] = {width:14 ,height:14};
imgcache[nexacro._getImageLocation("theme://images/img_groupboxtit.png")] = {width:8 ,height:8};
imgcache[nexacro._getImageLocation("theme://images/img_groupboxtit_D.png")] = {width:8 ,height:8};
imgcache[nexacro._getImageLocation("theme://images/img_TreeCollapse.png")] = {width:9 ,height:9};
imgcache[nexacro._getImageLocation("theme://images/img_TreeExpand.png")] = {width:9 ,height:9};
imgcache[nexacro._getImageLocation("theme://images/img_TreeItem.png")] = {width:9 ,height:11};
imgcache[nexacro._getImageLocation("theme://images/img_TreeClose.png")] = {width:9 ,height:9};
imgcache[nexacro._getImageLocation("theme://images/img_TreeOpen.png")] = {width:9 ,height:9};
imgcache[nexacro._getImageLocation("theme://images/img_TreeCheck_N.png")] = {width:14 ,height:14};
imgcache[nexacro._getImageLocation("theme://images/img_TreeCheck_S.png")] = {width:14 ,height:14};
	};
}
)();
