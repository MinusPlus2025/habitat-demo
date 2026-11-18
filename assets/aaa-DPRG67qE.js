import{$ as e,At as t,Ct as n,Et as r,Ht as i,I as a,L as o,Nt as s,O as c,P as l,R as u,Rt as d,S as ee,V as te,_ as ne,a as re,at as ie,b as f,bt as ae,c as oe,ct as se,d as ce,dt as p,et as m,ft as h,g as le,h as ue,jt as de,l as fe,nt as pe,ot as me,p as he,rt as g,t as ge,u as _,ut as v,v as y,vt as _e,wt as b,xt as ve,y as ye,yt as be,zt as x}from"./GLTFLoader-BmbHiWu7.js";import{t as xe}from"./meshopt_decoder.module-DPrBktm2.js";import{n as S,t as Se}from"./Pass-DCl3U3Ct.js";var C={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`},Ce=class extends S{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof b?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=s.clone(e.uniforms),this.material=new b({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Se(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},we=class extends S{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Te=class extends S{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Ee=class{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){let t=e.getSize(new d);this._width=t.width,this._height=t.height,n=new i(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:o}),n.texture.name=`EffectComposer.rt1`}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ce(C),this.copyPass.material.blending=0,this.timer=new t}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}we!==void 0&&(r instanceof we?n=!0:r instanceof Te&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new d);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},De=class extends S{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new y}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Oe={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new y(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`},w=class e extends S{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new d(256,256):new d(e.x,e.y),this.clearColor=new y(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),c=Math.round(this.resolution.y/2);this.renderTargetBright=new i(a,c,{type:o}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new i(a,c,{type:o});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new i(a,c,{type:o});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),a=Math.round(a/2),c=Math.round(c/2)}let l=Oe;this.highPassUniforms=s.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new b({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}),this.separableBlurMaterials=[];let u=[6,10,14,18,22];a=Math.round(this.resolution.x/2),c=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(u[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new d(1/a,1/c),a=Math.round(a/2),c=Math.round(c/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let ee=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=ee,this.bloomTintColors=[new x(1,1,1),new x(1,1,1),new x(1,1,1),new x(1,1,1),new x(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=s.clone(C.uniforms),this.blendMaterial=new b({uniforms:this.copyUniforms,vertexShader:C.vertexShader,fragmentShader:C.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new y,this._oldClearAlpha=1,this._basic=new m,this._fsQuad=new Se(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new d(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);return new b({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new d(.5,.5)},direction:{value:new d(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new b({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}};w.BlurDirectionX=new d(1,0),w.BlurDirectionY=new d(0,1);var T={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`},ke=class extends S{constructor(){super(),this.isOutputPass=!0,this.uniforms=s.clone(T.uniforms),this.material=new _e({name:T.name,uniforms:this.uniforms,vertexShader:T.vertexShader,fragmentShader:T.fragmentShader}),this._fsQuad=new Se(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ye.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},E=30,D=new re({antialias:!0,powerPreference:`high-performance`});D.setPixelRatio(Math.min(devicePixelRatio,1.5)),D.setSize(innerWidth,innerHeight),D.toneMapping=4,D.toneMappingExposure=.9,document.body.appendChild(D.domElement);var O=new n;O.background=new y(198154),O.fog=new l(198154,.02);var k=new se(46,innerWidth/innerHeight,.1,90);k.position.set(0,2,10.5);var A=new Ee(D);A.addPass(new De(O,k)),A.addPass(new w(new d(innerWidth,innerHeight),.38,.5,.76)),A.addPass(new ke);function Ae(){let e=document.createElement(`canvas`);e.width=e.height=512;let t=e.getContext(`2d`);t.fillStyle=`#2b3138`,t.fillRect(0,0,512,512);for(let e=0;e<9e3;e++){let e=18+Math.random()*34;t.fillStyle=`rgba(${e},${e+3},${e+7},.55)`,t.fillRect(Math.random()*512,Math.random()*512,2+Math.random()*4,2+Math.random()*4)}for(let e=0;e<80;e++){t.strokeStyle=`rgba(8,10,14,${.25+Math.random()*.4})`,t.lineWidth=1+Math.random()*2,t.beginPath();let e=Math.random()*512,n=Math.random()*512;t.moveTo(e,n);for(let r=0;r<4;r++)e+=(Math.random()-.5)*70,n+=(Math.random()-.5)*70,t.lineTo(e,n);t.stroke()}let n=new he(e);return n.wrapS=n.wrapT=be,n.repeat.set(3,1.5),n.colorSpace=ve,n}var je=new g({color:9082014,map:Ae(),roughness:.95,metalness:.05,emissive:461326,emissiveIntensity:.55,side:1}),j=new ee(13.5,15.2,9,72,16,!0,.42,Math.PI*2-.84),M=j.attributes.position;for(let e=0;e<M.count;e++){let t=M.getX(e),n=M.getY(e),r=M.getZ(e),i=Math.hypot(t,r),a=Math.atan2(r,t),o=Math.sin(a*7+n*.9)*.5+Math.sin(a*13-n*1.7)*.25;M.setX(e,t+t/Math.max(i,.001)*o*.45),M.setZ(e,r+r/Math.max(i,.001)*o*.45),M.setY(e,n+Math.sin(a*9+n*.6)*.2)}j.computeVertexNormals();var N=new e(j,je);N.rotation.y=Math.PI/2,N.position.y=4.5,O.add(N);var Me=new e(new le(15.2,72),new g({color:724756,roughness:.7,metalness:.2}));Me.rotation.x=-Math.PI/2,O.add(Me);var P=new e(new ae(2.2,15.2,72),new g({color:527119,roughness:1,side:2}));P.rotation.x=-Math.PI/2,P.position.y=8.9,O.add(P);var F=new g({color:2304560,roughness:.88,metalness:.1}),Ne=new e(new de(4.8,.58,8,36,Math.PI),F);Ne.position.set(0,0,12.2),O.add(Ne);for(let t of[-1,1]){let n=new e(new c(1.5,0),F);n.position.set(t*4.8,.9,12.2),n.rotation.set(t*.3,t,.2),O.add(n)}var Pe=new e(new f(1.35,14,40,1,!0),new m({color:16767392,transparent:!0,opacity:.012,side:2,blending:2,depthWrite:!1}));Pe.position.set(0,7.2,0),O.add(Pe);var I=new r(16766883,180,32,.45,.7,1.4);I.position.set(0,17,0),I.target.position.set(0,.6,0),O.add(I,I.target),O.add(new u(7114664,329224,.55));var Fe=new v(16763034,50,28,1.5);Fe.position.set(0,4.8,0),O.add(Fe);var Ie=new v(5224649,45,18,1.6);Ie.position.set(0,3.2,-11),O.add(Ie);var L=new v(16769200,20,9,1.7);L.position.set(0,3.2,3.4),O.add(L);for(let t=0;t<34;t++){let t=Math.random()*Math.PI*2,n=3.5+Math.random()*11,r=.8+Math.random()*2.8,i=new e(new f(.16+Math.random()*.35,r,5),F);i.position.set(Math.cos(t)*n,8.7-r/2,Math.sin(t)*n),i.rotation.z=Math.PI,O.add(i)}for(let t=0;t<22;t++){let t=Math.random()*Math.PI*2,n=8.2+Math.random()*4.6,r=.7+Math.random()*2.2,i=new e(new f(.2+Math.random()*.4,r,5),F);i.position.set(Math.cos(t)*n,r/2,Math.sin(t)*n),O.add(i)}for(let t=0;t<18;t++){let n=t/18*Math.PI*2,r=11.8+Math.random()*1.2,i=new e(new c(1.2+Math.random()*1.8,0),F);i.position.set(Math.cos(n)*r,1.1+Math.random()*4.8,Math.sin(n)*r),i.rotation.set(Math.random(),Math.random(),Math.random()),O.add(i)}for(let t=0;t<6;t++){let n=t/6*Math.PI*2+Math.PI/6,r=9.4,i=new a;i.position.set(Math.cos(n)*r,0,Math.sin(n)*r),i.lookAt(0,0,0),O.add(i);let o=new e(new fe(.45,3.4,.55),F);o.position.set(-1.15,1.7,0);let s=o.clone();s.position.x=1.15;let c=new e(new fe(2.8,.4,.55),F);c.position.y=3.4,i.add(o,s,c);let l=new e(new ee(.85,1,.35,24),F);l.position.y=.18,i.add(l);let u=new e(new me(.28,0),new g({color:7532509,emissive:3065780,emissiveIntensity:.8,roughness:.15,metalness:.6}));u.position.y=1.35,i.add(u);let d=new v(7532509,2.2,4.5,1.8);d.position.set(0,1.6,.6),i.add(d)}var R=new x(-6.4,0,-3.2),z=new e(new le(3.7,56),new pe({color:805982,roughness:.06,metalness:.15,transparent:!0,opacity:.72,transmission:.25,thickness:.4}));z.rotation.x=-Math.PI/2,z.position.copy(R).setY(.03),O.add(z);var B=new e(new de(3.75,.22,8,64),F);B.rotation.x=Math.PI/2,B.position.copy(R).setY(.12),O.add(B);var Le=new v(5224649,18,9,1.8);Le.position.set(R.x,1.4,R.z),O.add(Le);var V=new Float32Array(240);for(let e=0;e<80;e++){let t=Math.random()*Math.PI*2,n=Math.random()*3.2;V[e*3]=R.x+Math.cos(t)*n,V[e*3+1]=.1+Math.random()*1.6,V[e*3+2]=R.z+Math.sin(t)*n}var H=new ce;H.setAttribute(`position`,new _(V,3));var Re=new p(H,new h({color:10479871,size:.035,transparent:!0,opacity:.65,blending:2,depthWrite:!1}));O.add(Re);var U=new a;O.add(U);var W=new e(new ae(1.9,2.3,64),new m({color:16765286,transparent:!0,opacity:.35,side:2,blending:2,depthWrite:!1}));W.rotation.x=-Math.PI/2,W.position.y=.04,U.add(W);for(let t=0;t<16;t++){let n=t/16*Math.PI*2,r=new e(new c(.22+Math.random()*.16,0),new g({color:2765112,roughness:.9,metalness:.1}));r.position.set(Math.cos(n)*2.6,.18,Math.sin(n)*2.6),r.rotation.set(Math.random(),Math.random(),Math.random()),U.add(r)}var ze=new f(.06,.8,4),G=new te(ze,new g({color:1593162,emissive:2068351,emissiveIntensity:1.1,roughness:.4}),140),K=new ie;for(let e=0;e<140;e++){let t=Math.random()*Math.PI*2,n=7.2+Math.random()*5.2;K.position.set(Math.cos(t)*n,.35,Math.sin(t)*n),K.rotation.y=Math.random()*Math.PI,K.scale.set(1,.6+Math.random()*1.4,1),K.updateMatrix(),G.setMatrixAt(e,K.matrix)}G.instanceMatrix.needsUpdate=!0,O.add(G);var q=420,J=new Float32Array(q*3);for(let e=0;e<q;e++){let t=Math.random()*Math.PI*2,n=Math.random()*13;J[e*3]=Math.cos(t)*n,J[e*3+1]=.2+Math.random()*8,J[e*3+2]=Math.sin(t)*n}var Y=new ce;Y.setAttribute(`position`,new _(J,3));var Be=new p(Y,new h({color:10467528,size:.022,transparent:!0,opacity:.4,blending:2,depthWrite:!1}));O.add(Be);var Ve=160,X=new Float32Array(480);for(let e=0;e<Ve;e++){let t=Math.random()*Math.PI*2,n=Math.random()*3.4;X[e*3]=Math.cos(t)*n,X[e*3+1]=.2+Math.random()*2.8,X[e*3+2]=Math.sin(t)*n}var He=new ce;He.setAttribute(`position`,new _(X,3));var Ue=new p(He,new h({color:10479832,size:.03,transparent:!0,opacity:.75,blending:2,depthWrite:!1}));O.add(Ue);var We=new a;O.add(We);function Ge(e){let t=new oe().setFromObject(e),n=new x;t.getSize(n);let r=2.45/Math.max(n.y,.05);e.scale.setScalar(r);let i=t.getCenter(new x);e.position.set(-i.x*r,-t.min.y*r+.06,-i.z*r)}var Ke=document.getElementById(`glb`).textContent.trim();function qe(e){let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return n.buffer}var Je=new ge;Je.setMeshoptDecoder(xe),Je.parse(qe(Ke),``,e=>{Ge(e.scene),e.scene.rotation.y=Math.PI,We.add(e.scene),document.getElementById(`load`).classList.add(`hidden`)},e=>{console.error(e),document.getElementById(`load`).classList.add(`hidden`)}),setTimeout(()=>document.getElementById(`load`).classList.add(`hidden`),6e3);var Ye=[new x(0,2.2,9.5),new x(4.2,2.2,7),new x(7.2,2.4,2),new x(6.2,2.5,-4),new x(0,2.6,-6),new x(-6.2,2.4,-3),new x(-7.2,2.2,3),new x(-3.2,2,6),new x(0,1.7,4.2)],Xe=[new x(0,1.6,0),new x(0,1.5,0),new x(0,1.5,0),new x(0,1.5,0),new x(0,1.5,0),new x(0,1.5,0),new x(0,1.5,0),new x(0,1.5,0),new x(0,1.5,0)],Ze=new ue(Ye,!1,`catmullrom`,.35),Qe=new ue(Xe,!1,`catmullrom`,.35),Z=[{at:0,k:`01 / BODY`,t:`它没有眼睛。它用身体丈量黑暗。`},{at:5,k:`02 / FOUR LEGS + TWO WINGS`,t:`四足，双翼，六个洞室。每一条肢体都有自己的房间。`},{at:10,k:`03 / GILLS`,t:`鳃，水房。它必须回到水里呼吸。`},{at:15,k:`04 / WINGS`,t:`翼，天井。它从头顶的裂缝里取风。`},{at:20,k:`05 / LUMENS`,t:`发光器，暗巢。它把唯一的光留在家里。`},{at:25,k:`06 / NICHE`,t:`这不是一只怪物。这是一个生态位。`}],$e=-1,et=document.getElementById(`cap`),tt=document.getElementById(`cap-k`),nt=document.getElementById(`cap-t`),rt=document.getElementById(`title`),it=document.getElementById(`end`),at=document.getElementById(`pfill`),ot=document.getElementById(`pct`);function st(e){e!==$e&&($e=e,et.classList.add(`out`),setTimeout(()=>{tt.textContent=Z[e].k,nt.textContent=Z[e].t,et.classList.remove(`out`)},180))}var Q=performance.now(),$=!1;document.getElementById(`replay`).onclick=()=>{Q=performance.now(),$=!1,it.classList.remove(`show`),rt.classList.remove(`out`),$e=-1};var ct=new ne;function lt(){requestAnimationFrame(lt);let e=Math.min(ct.getDelta(),.05),t=ct.elapsedTime,n=Math.min(1,(performance.now()-Q)/1e3/E);Ze.getPoint(n,k.position);let r=Qe.getPoint(n);k.position.x+=Math.sin(t*.7)*.018,k.position.y+=Math.sin(t*.9+1)*.014,k.lookAt(r);let i=0;for(let e=0;e<Z.length;e++)n*E>=Z[e].at&&(i=e);st(i),at.style.width=`${n*100}%`,ot.textContent=`${String(Math.floor(n*E)).padStart(2,`0`)} / 30`,n>.08&&rt.classList.add(`out`),n>=1&&!$&&($=!0,it.classList.add(`show`)),We.position.y=Math.sin(t*1.05)*.035;let a=H.attributes.position;for(let t=0;t<80;t++){let n=a.getY(t)+e*(.15+t%5*.03);n>2.2&&(n=.08),a.setY(t,n)}a.needsUpdate=!0;let o=He.attributes.position;for(let t=0;t<Ve;t++){let n=o.getY(t)+e*.08;n>3.2&&(n=.2),o.setY(t,n)}o.needsUpdate=!0;let s=Y.attributes.position;for(let t=0;t<q;t++){let n=s.getY(t)+e*.04;n>8.6&&(n=.2),s.setY(t,n)}s.needsUpdate=!0,I.intensity=440+Math.sin(t*1.3)*40,L.intensity=32+Math.sin(t*1.7)*4,A.render()}addEventListener(`resize`,()=>{k.aspect=innerWidth/innerHeight,k.updateProjectionMatrix(),D.setSize(innerWidth,innerHeight),A.setSize(innerWidth,innerHeight)}),lt(),window.__AAA={seek:e=>{Q=performance.now()-e*E*1e3}},new URLSearchParams(location.search).has(`record`)&&setTimeout(()=>{try{Q=performance.now();let e=D.domElement.captureStream(30),t=MediaRecorder.isTypeSupported(`video/webm;codecs=vp9`)?`video/webm;codecs=vp9`:`video/webm`,n=new MediaRecorder(e,{mimeType:t,videoBitsPerSecond:1e7}),r=[],i={state:`recording`,bytes:0,result:``};window.__REC=i,n.ondataavailable=e=>{e.data.size>0&&(r.push(e.data),i.bytes+=e.data.size)},n.onstop=async()=>{i.state=`saving`;try{let e=await fetch(`/api/save-film`,{method:`POST`,body:new Blob(r,{type:`video/webm`})});i.result=await e.text(),i.state=`saved`}catch(e){i.state=`error`,i.result=String(e)}},n.start(),setTimeout(()=>n.stop(),3e4)}catch(e){console.error(`RECORD_FAILED`,e)}},6e3);