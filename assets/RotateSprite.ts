import { __private, _decorator, CCBoolean, CCFloat, Component, gfx, Node, RenderData, Sprite, Vec2 } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('RotateSprite')
export class RotateSprite extends Sprite {
    @property({ type: CCFloat, visible: true })
    private _rotateSpeed: number = 1;
    @property({ type: Vec2, visible: true })
    private _rotateCenter: Vec2 = new Vec2(0.5, 0.5);
    @property({ type: CCBoolean, visible: true })
    private _isClockWise: boolean = true;
    @property({ type: CCFloat, visible: true })
    private _distort: number = 1;

    public get rotateSpeed(): number {
        return this._rotateSpeed;
    }

    public set rotateSpeed(value: number) {
        if (this._rotateSpeed == value) return;
        this._rotateSpeed = value;
    }

    public get rotateCenter(): Vec2 {
        return this._rotateCenter;
    }

    public set rotateCenter(value: Vec2) {
        if (this._rotateCenter.equals(value)) return;
        this._rotateCenter.set(value);
    }

    public get isClockWise(): boolean {
        return this._isClockWise;
    }

    public set isClockWise(value: boolean) {
        if (this._isClockWise == value) return;
        this._isClockWise = value;
    }

    public get distort(): number {
        return this._distort;
    }

    public set distort(value: number) {
        if (this._distort == value) return;
        this._distort = value;
    }

    public requestRenderData(drawInfoType?: __private._cocos_2d_renderer_render_draw_info__RenderDrawInfoType): RenderData {
        const data = RenderData.add([
            new gfx.Attribute(gfx.AttributeName.ATTR_POSITION, gfx.Format.RGB32F),
            new gfx.Attribute(gfx.AttributeName.ATTR_TEX_COORD, gfx.Format.RG32F),
            new gfx.Attribute(gfx.AttributeName.ATTR_COLOR, gfx.Format.RGBA32F),
            new gfx.Attribute("a_rotateSpeed", gfx.Format.R32F),
            new gfx.Attribute("a_rotateCenter", gfx.Format.RG32F),
            new gfx.Attribute("a_clockwise", gfx.Format.R32F),
            new gfx.Attribute("a_distort", gfx.Format.R32F),
        ]);
        data.initRenderDrawInfo(this, drawInfoType);
        this._renderData = data;
        return data;
    }

}


