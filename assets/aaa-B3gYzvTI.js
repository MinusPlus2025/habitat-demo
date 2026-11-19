import{C as e,Ct as t,Dt as n,F as r,Gt as i,H as a,It as o,Jt as s,L as c,Lt as l,Ot as u,R as d,Tt as ee,Wt as f,_ as te,a as ne,at as p,b as m,c as re,ct as ie,d as h,g as ae,h as oe,ht as g,it as se,jt as ce,k as _,l as le,mt as v,nt as ue,p as de,pt as y,st as fe,t as pe,tt as b,u as me,ut as he,v as x,wt as ge,xt as _e,y as ve,z as ye,zt as S}from"./GLTFLoader-D0KMUT2V.js";import{t as be}from"./meshopt_decoder.module-DPrBktm2.js";import{n as C,t as w}from"./Pass--NDKL1Ck.js";var T={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},xe=class extends C{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof u?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=S.clone(e.uniforms),this.material=new u({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new w(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Se=class extends C{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Ce=class extends C{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},we=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new f);this._width=n.width,this._height=n.height,t=new s(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:d}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new xe(T),this.copyPass.material.blending=0,this.timer=new o}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Se!==void 0&&(r instanceof Se?n=!0:r instanceof Ce&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new f);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Te=class extends C{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new x}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Ee={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new x(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},E=class e extends C{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new f(256,256):new f(e.x,e.y),this.clearColor=new x(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new s(a,o,{type:d}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new s(a,o,{type:d});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new s(a,o,{type:d});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),a=Math.round(a/2),o=Math.round(o/2)}let c=Ee;this.highPassUniforms=S.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new u({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new f(1/a,1/o),a=Math.round(a/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let ee=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=ee,this.bloomTintColors=[new i(1,1,1),new i(1,1,1),new i(1,1,1),new i(1,1,1),new i(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=S.clone(T.uniforms),this.blendMaterial=new u({uniforms:this.copyUniforms,vertexShader:T.vertexShader,fragmentShader:T.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new x,this._oldClearAlpha=1,this._basic=new ue,this._fsQuad=new w(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new f(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);return new u({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new f(.5,.5)},direction:{value:new f(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new u({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};E.BlurDirectionX=new f(1,0),E.BlurDirectionY=new f(0,1);var D={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},De=class extends C{constructor(){super(),this.isOutputPass=!0,this.uniforms=S.clone(D.uniforms),this.material=new _e({name:D.name,uniforms:this.uniforms,vertexShader:D.vertexShader,fragmentShader:D.fragmentShader}),this._fsQuad=new w(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ve.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},O=30,k=new ne({antialias:!0,powerPreference:`high-performance`});k.setPixelRatio(Math.min(devicePixelRatio,1.5)),k.setSize(innerWidth,innerHeight),k.toneMapping=4,k.toneMappingExposure=.9,document.body.appendChild(k.domElement);var A=new n;A.background=new x(198154),A.fog=new r(198154,.02);var j=new he(46,innerWidth/innerHeight,.1,90);j.position.set(0,2,10.5);var M=new we(k);M.addPass(new Te(A,j)),M.addPass(new E(new f(innerWidth,innerHeight),.38,.5,.76)),M.addPass(new De);function Oe(){let e=document.createElement(`canvas`);e.width=e.height=512;let n=e.getContext(`2d`);n.fillStyle=`#2b3138`,n.fillRect(0,0,512,512);for(let e=0;e<9e3;e++){let e=18+Math.random()*34;n.fillStyle=`rgba(${e},${e+3},${e+7},.55)`,n.fillRect(Math.random()*512,Math.random()*512,2+Math.random()*4,2+Math.random()*4)}for(let e=0;e<80;e++){n.strokeStyle=`rgba(8,10,14,${.25+Math.random()*.4})`,n.lineWidth=1+Math.random()*2,n.beginPath();let e=Math.random()*512,t=Math.random()*512;n.moveTo(e,t);for(let r=0;r<4;r++)e+=(Math.random()-.5)*70,t+=(Math.random()-.5)*70,n.lineTo(e,t);n.stroke()}let r=new de(e);return r.wrapS=r.wrapT=t,r.repeat.set(3,1.5),r.colorSpace=ee,r}var ke=new p({color:9082014,map:Oe(),roughness:.95,metalness:.05,emissive:461326,emissiveIntensity:.55,side:1}),N=new e(13.5,15.2,9,72,16,!0,.42,Math.PI*2-.84),P=N.attributes.position;for(let e=0;e<P.count;e++){let t=P.getX(e),n=P.getY(e),r=P.getZ(e),i=Math.hypot(t,r),a=Math.atan2(r,t),o=Math.sin(a*7+n*.9)*.5+Math.sin(a*13-n*1.7)*.25;P.setX(e,t+t/Math.max(i,.001)*o*.45),P.setZ(e,r+r/Math.max(i,.001)*o*.45),P.setY(e,n+Math.sin(a*9+n*.6)*.2)}N.computeVertexNormals();var F=new b(N,ke);F.rotation.y=Math.PI/2,F.position.y=4.5,A.add(F);var Ae=new b(new ae(15.2,72),new p({color:724756,roughness:.7,metalness:.2}));Ae.rotation.x=-Math.PI/2,A.add(Ae);var I=new b(new ge(2.2,15.2,72),new p({color:527119,roughness:1,side:2}));I.rotation.x=-Math.PI/2,I.position.y=8.9,A.add(I);var L=new p({color:2304560,roughness:.88,metalness:.1}),je=new b(new l(4.8,.58,8,36,Math.PI),L);je.position.set(0,0,12.2),A.add(je);for(let e of[-1,1]){let t=new b(new _(1.5,0),L);t.position.set(e*4.8,.9,12.2),t.rotation.set(e*.3,e,.2),A.add(t)}var Me=new b(new m(1.35,14,40,1,!0),new ue({color:16767392,transparent:!0,opacity:.012,side:2,blending:2,depthWrite:!1}));Me.position.set(0,7.2,0),A.add(Me);var R=new ce(16766883,180,32,.45,.7,1.4);R.position.set(0,17,0),R.target.position.set(0,.6,0),A.add(R,R.target),A.add(new ye(7114664,329224,.55));var Ne=new y(16763034,50,28,1.5);Ne.position.set(0,4.8,0),A.add(Ne);var Pe=new y(5224649,45,18,1.6);Pe.position.set(0,3.2,-11),A.add(Pe);var z=new y(16769200,20,9,1.7);z.position.set(0,3.2,3.4),A.add(z);for(let e=0;e<34;e++){let e=Math.random()*Math.PI*2,t=3.5+Math.random()*11,n=.8+Math.random()*2.8,r=new b(new m(.16+Math.random()*.35,n,5),L);r.position.set(Math.cos(e)*t,8.7-n/2,Math.sin(e)*t),r.rotation.z=Math.PI,A.add(r)}for(let e=0;e<22;e++){let e=Math.random()*Math.PI*2,t=8.2+Math.random()*4.6,n=.7+Math.random()*2.2,r=new b(new m(.2+Math.random()*.4,n,5),L);r.position.set(Math.cos(e)*t,n/2,Math.sin(e)*t),A.add(r)}for(let e=0;e<18;e++){let t=e/18*Math.PI*2,n=11.8+Math.random()*1.2,r=new b(new _(1.2+Math.random()*1.8,0),L);r.position.set(Math.cos(t)*n,1.1+Math.random()*4.8,Math.sin(t)*n),r.rotation.set(Math.random(),Math.random(),Math.random()),A.add(r)}for(let t=0;t<6;t++){let n=t/6*Math.PI*2+Math.PI/6,r=9.4,i=new c;i.position.set(Math.cos(n)*r,0,Math.sin(n)*r),i.lookAt(0,0,0),A.add(i);let a=new b(new le(.45,3.4,.55),L);a.position.set(-1.15,1.7,0);let o=a.clone();o.position.x=1.15;let s=new b(new le(2.8,.4,.55),L);s.position.y=3.4,i.add(a,o,s);let l=new b(new e(.85,1,.35,24),L);l.position.y=.18,i.add(l);let u=new b(new ie(.28,0),new p({color:7532509,emissive:3065780,emissiveIntensity:.8,roughness:.15,metalness:.6}));u.position.y=1.35,i.add(u);let d=new y(7532509,2.2,4.5,1.8);d.position.set(0,1.6,.6),i.add(d)}var B=new i(-6.4,0,-3.2),V=new b(new ae(3.7,56),new se({color:805982,roughness:.06,metalness:.15,transparent:!0,opacity:.72,transmission:.25,thickness:.4}));V.rotation.x=-Math.PI/2,V.position.copy(B).setY(.03),A.add(V);var H=new b(new l(3.75,.22,8,64),L);H.rotation.x=Math.PI/2,H.position.copy(B).setY(.12),A.add(H);var Fe=new y(5224649,18,9,1.8);Fe.position.set(B.x,1.4,B.z),A.add(Fe);var U=new Float32Array(240);for(let e=0;e<80;e++){let t=Math.random()*Math.PI*2,n=Math.random()*3.2;U[e*3]=B.x+Math.cos(t)*n,U[e*3+1]=.1+Math.random()*1.6,U[e*3+2]=B.z+Math.sin(t)*n}var W=new h;W.setAttribute(`position`,new me(U,3));var Ie=new v(W,new g({color:10479871,size:.035,transparent:!0,opacity:.65,blending:2,depthWrite:!1}));A.add(Ie);var G=new c;A.add(G);var K=new b(new ge(1.9,2.3,64),new ue({color:16765286,transparent:!0,opacity:.35,side:2,blending:2,depthWrite:!1}));K.rotation.x=-Math.PI/2,K.position.y=.04,G.add(K);for(let e=0;e<16;e++){let t=e/16*Math.PI*2,n=new b(new _(.22+Math.random()*.16,0),new p({color:2765112,roughness:.9,metalness:.1}));n.position.set(Math.cos(t)*2.6,.18,Math.sin(t)*2.6),n.rotation.set(Math.random(),Math.random(),Math.random()),G.add(n)}var Le=new m(.06,.8,4),q=new a(Le,new p({color:1593162,emissive:2068351,emissiveIntensity:1.1,roughness:.4}),140),J=new fe;for(let e=0;e<140;e++){let t=Math.random()*Math.PI*2,n=7.2+Math.random()*5.2;J.position.set(Math.cos(t)*n,.35,Math.sin(t)*n),J.rotation.y=Math.random()*Math.PI,J.scale.set(1,.6+Math.random()*1.4,1),J.updateMatrix(),q.setMatrixAt(e,J.matrix)}q.instanceMatrix.needsUpdate=!0,A.add(q);var Re=420,Y=new Float32Array(Re*3);for(let e=0;e<Re;e++){let t=Math.random()*Math.PI*2,n=Math.random()*13;Y[e*3]=Math.cos(t)*n,Y[e*3+1]=.2+Math.random()*8,Y[e*3+2]=Math.sin(t)*n}var ze=new h;ze.setAttribute(`position`,new me(Y,3));var Be=new v(ze,new g({color:10467528,size:.022,transparent:!0,opacity:.4,blending:2,depthWrite:!1}));A.add(Be);var Ve=160,X=new Float32Array(480);for(let e=0;e<Ve;e++){let t=Math.random()*Math.PI*2,n=Math.random()*3.4;X[e*3]=Math.cos(t)*n,X[e*3+1]=.2+Math.random()*2.8,X[e*3+2]=Math.sin(t)*n}var He=new h;He.setAttribute(`position`,new me(X,3));var Ue=new v(He,new g({color:10479832,size:.03,transparent:!0,opacity:.75,blending:2,depthWrite:!1}));A.add(Ue);var We=new c;A.add(We);function Ge(e){let t=new re().setFromObject(e),n=new i;t.getSize(n);let r=2.45/Math.max(n.y,.05);e.scale.setScalar(r);let a=t.getCenter(new i);e.position.set(-a.x*r,-t.min.y*r+.06,-a.z*r)}var Ke=document.getElementById(`glb`).textContent.trim();function qe(e){let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return n.buffer}var Je=new pe;Je.setMeshoptDecoder(be),Je.parse(qe(Ke),``,e=>{Ge(e.scene),e.scene.rotation.y=Math.PI,We.add(e.scene),document.getElementById(`load`).classList.add(`hidden`)},e=>{console.error(e),document.getElementById(`load`).classList.add(`hidden`)}),setTimeout(()=>document.getElementById(`load`).classList.add(`hidden`),6e3);var Ye=[new i(0,2.2,9.5),new i(4.2,2.2,7),new i(7.2,2.4,2),new i(6.2,2.5,-4),new i(0,2.6,-6),new i(-6.2,2.4,-3),new i(-7.2,2.2,3),new i(-3.2,2,6),new i(0,1.7,4.2)],Xe=[new i(0,1.6,0),new i(0,1.5,0),new i(0,1.5,0),new i(0,1.5,0),new i(0,1.5,0),new i(0,1.5,0),new i(0,1.5,0),new i(0,1.5,0),new i(0,1.5,0)],Ze=new oe(Ye,!1,`catmullrom`,.35),Qe=new oe(Xe,!1,`catmullrom`,.35),Z=[{at:0,k:`01 / BODY`,t:`它没有眼睛。它用身体丈量黑暗。`},{at:5,k:`02 / FOUR LEGS + TWO WINGS`,t:`四足，双翼，六个洞室。每一条肢体都有自己的房间。`},{at:10,k:`03 / GILLS`,t:`鳃，水房。它必须回到水里呼吸。`},{at:15,k:`04 / WINGS`,t:`翼，天井。它从头顶的裂缝里取风。`},{at:20,k:`05 / LUMENS`,t:`发光器，暗巢。它把唯一的光留在家里。`},{at:25,k:`06 / NICHE`,t:`这不是一只怪物。这是一个生态位。`}],$e=-1,et=document.getElementById(`cap`),tt=document.getElementById(`cap-k`),nt=document.getElementById(`cap-t`),rt=document.getElementById(`title`),it=document.getElementById(`end`),at=document.getElementById(`pfill`),ot=document.getElementById(`pct`);function st(e){e!==$e&&($e=e,et.classList.add(`out`),setTimeout(()=>{tt.textContent=Z[e].k,nt.textContent=Z[e].t,et.classList.remove(`out`)},180))}var Q=performance.now(),$=!1;document.getElementById(`replay`).onclick=()=>{Q=performance.now(),$=!1,it.classList.remove(`show`),rt.classList.remove(`out`),$e=-1};var ct=new te;function lt(){requestAnimationFrame(lt);let e=Math.min(ct.getDelta(),.05),t=ct.elapsedTime,n=Math.min(1,(performance.now()-Q)/1e3/O);Ze.getPoint(n,j.position);let r=Qe.getPoint(n);j.position.x+=Math.sin(t*.7)*.018,j.position.y+=Math.sin(t*.9+1)*.014,j.lookAt(r);let i=0;for(let e=0;e<Z.length;e++)n*O>=Z[e].at&&(i=e);st(i),at.style.width=`${n*100}%`,ot.textContent=`${String(Math.floor(n*O)).padStart(2,`0`)} / 30`,n>.08&&rt.classList.add(`out`),n>=1&&!$&&($=!0,it.classList.add(`show`)),We.position.y=Math.sin(t*1.05)*.035;let a=W.attributes.position;for(let t=0;t<80;t++){let n=a.getY(t)+e*(.15+t%5*.03);n>2.2&&(n=.08),a.setY(t,n)}a.needsUpdate=!0;let o=He.attributes.position;for(let t=0;t<Ve;t++){let n=o.getY(t)+e*.08;n>3.2&&(n=.2),o.setY(t,n)}o.needsUpdate=!0;let s=ze.attributes.position;for(let t=0;t<Re;t++){let n=s.getY(t)+e*.04;n>8.6&&(n=.2),s.setY(t,n)}s.needsUpdate=!0,R.intensity=440+Math.sin(t*1.3)*40,z.intensity=32+Math.sin(t*1.7)*4,M.render()}addEventListener(`resize`,()=>{j.aspect=innerWidth/innerHeight,j.updateProjectionMatrix(),k.setSize(innerWidth,innerHeight),M.setSize(innerWidth,innerHeight)}),lt(),window.__AAA={seek:e=>{Q=performance.now()-e*O*1e3}},new URLSearchParams(location.search).has(`record`)&&setTimeout(()=>{try{Q=performance.now();let e=k.domElement.captureStream(30),t=MediaRecorder.isTypeSupported(`video/webm;codecs=vp9`)?`video/webm;codecs=vp9`:`video/webm`,n=new MediaRecorder(e,{mimeType:t,videoBitsPerSecond:1e7}),r=[],i={state:`recording`,bytes:0,result:``};window.__REC=i,n.ondataavailable=e=>{e.data.size>0&&(r.push(e.data),i.bytes+=e.data.size)},n.onstop=async()=>{i.state=`saving`;try{let e=await fetch(`/api/save-film`,{method:`POST`,body:new Blob(r,{type:`video/webm`})});i.result=await e.text(),i.state=`saved`}catch(e){i.state=`error`,i.result=String(e)}},n.start(),setTimeout(()=>n.stop(),3e4)}catch(e){console.error(`RECORD_FAILED`,e)}},6e3);