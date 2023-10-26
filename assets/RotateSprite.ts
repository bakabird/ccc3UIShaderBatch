import { __private, _decorator, CCBoolean, CCFloat, Component, gfx, Node, RenderData, Sprite, Vec2 } from 'cc';
import { rotateAssembler } from './rotateAssembler';
const { ccclass, property, executeInEditMode } = _decorator;

const myVfmt = [
    new gfx.Attribute(gfx.AttributeName.ATTR_POSITION, gfx.Format.RGB32F),
    new gfx.Attribute(gfx.AttributeName.ATTR_TEX_COORD, gfx.Format.RG32F),
    new gfx.Attribute(gfx.AttributeName.ATTR_COLOR, gfx.Format.RGBA32F),
    new gfx.Attribute("a_rotateSpeed", gfx.Format.R32F),
    new gfx.Attribute("a_rotateCenter", gfx.Format.RG32F),
    new gfx.Attribute("a_clockwise", gfx.Format.R32F),
    new gfx.Attribute("a_distort", gfx.Format.R32F),
]

@ccclass('RotateSprite')
@executeInEditMode
export class RotateSprite extends Sprite {
    @property({ type: CCFloat })
    private _rotateSpeed: number = 1;
    @property({ type: Vec2 })
    private _rotateCenter: Vec2 = new Vec2(0.5, 0.5);
    @property({ type: CCBoolean })
    private _isClockWise: boolean = true;
    @property({ type: CCFloat })
    private _distort: number = 1;

    public get rotateSpeed(): number {
        return this._rotateSpeed;
    }

    @property({ type: CCFloat })
    public set rotateSpeed(value: number) {
        if (this._rotateSpeed == value) return;
        this._rotateSpeed = value;
        this._updateRotateSpeed()
    }

    public get rotateCenter(): Vec2 {
        return this._rotateCenter;
    }

    @property({ type: Vec2 })
    public set rotateCenter(value: Vec2) {
        if (this._rotateCenter.equals(value)) return;
        this._rotateCenter.set(value);
        this._updateRotateCenter()
    }

    public get isClockWise(): boolean {
        return this._isClockWise;
    }

    @property({ type: CCBoolean })
    public set isClockWise(value: boolean) {
        if (this._isClockWise == value) return;
        this._isClockWise = value;
        this._updateaClockwise()
    }

    public get distort(): number {
        return this._distort;
    }

    @property({ type: CCFloat })
    public set distort(value: number) {
        if (this._distort == value) return;
        this._distort = value;
        this._updateDistort()
    }

    private _loaded: boolean = false;

    public onLoad(): void {
        super.onLoad?.();
        this._loaded = true;
    }

    public start(): void {
        this.scheduleOnce(() => {
            this._sync();
        }, 0);
    }

    private _sync() {
        this._updateRotateSpeed()
        this._updateRotateCenter()
        this._updateaClockwise();
        this._updateDistort();
    }

    public requestRenderData(drawInfoType?: __private._cocos_2d_renderer_render_draw_info__RenderDrawInfoType): RenderData {
        const data = RenderData.add(myVfmt);
        data.initRenderDrawInfo(this, drawInfoType);
        this._renderData = data;
        return data;
    }

    protected _flushAssembler() {
        const assembler = rotateAssembler;

        if (this._assembler !== assembler) {
            this.destroyRenderData();
            this._assembler = assembler;
        }

        if (!this._renderData) {
            if (this._assembler && this._assembler.createData) {
                this._renderData = this._assembler.createData(this);
                this._renderData!.material = this.getRenderMaterial(0);
                this.markForUpdateRenderData();
                if (this.spriteFrame) {
                    this._assembler.updateUVs(this);
                }
                this._updateColor();
                this._updateRotateSpeed()
                this._updateRotateCenter()
                this._updateaClockwise();
                this._updateDistort();
            }
        }
    }

    private _updateRotateSpeed() {
        if (this._assembler) {
            this._assembler.updateRotateSpeed(this);
            this.markForUpdateRenderData()
        }
    }

    private _updateRotateCenter() {
        if (this._assembler) {
            this._assembler.updateRotateCenter(this);
            this.markForUpdateRenderData()
        }
    }

    private _updateaClockwise() {
        if (this._assembler) {
            this._assembler.updateaClockwise(this);
            this.markForUpdateRenderData()
        }
    }

    private _updateDistort() {
        if (this._assembler) {
            this._assembler.updateaDistort(this);
            this.markForUpdateRenderData()
        }
    }
}


